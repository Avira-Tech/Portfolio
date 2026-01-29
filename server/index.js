const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cron = require("node-cron");
const Parser = require("rss-parser");
const path = require("path"); // Added for file paths

dotenv.config();

const app = express();
const parser = new Parser();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["https://aviratech.co.in", "http://localhost:5173"], // Update with your actual frontend URL
    methods: ["GET", "POST"],
  }),
);
app.use(express.json());

// Serve static assets (for the logo)
app.use("/assets", express.static(path.join(__dirname, "assets")));

let cachedBlogs = [];

/* ============================================================
   ✅ HIGH-SPEED CONTACT ENDPOINT
   ============================================================ */
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // 1. Immediate Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // 2. Send SUCCESS response immediately to the frontend
  // The user sees "Sent!" instantly while the server works in the background
  res.status(200).json({ success: true, message: "Inquiry accepted" });

  // 3. Process emails in the background (Non-blocking)
  const sendBackgroundEmails = async () => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.zoho.in",
        port: 587,
        secure: false,
        requireTLS: true,
        pool: true, // ✅ Use pooling for faster delivery
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
              tls: { rejectUnauthorized: false },

      });

      const clientMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `We've received your inquiry - Avira Tech`,
        html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
          <h2 style="color: #2563eb;">Hello ${name},</h2>
          <p>Thank you for reaching out to <strong>Avira Tech</strong>!</p>
          <p>We've received your message regarding <b>"${subject}"</b>. Our team will review your request and get back to you shortly.</p>

          <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="margin-bottom: 5px; font-weight: bold;">Best Regards,</p>
            <p style="font-size: 14px; color: #666; margin: 0;">
              <strong>Avira Tech Team</strong><br />
              Digital Solutions & Innovation<br />
              <a href="https://aviratech.co.in" style="color: #2563eb; text-decoration: none;">www.aviratech.co.in</a>
            </p>
            <img src="cid:aviratlogo" alt="Avira Tech Logo" style="width: 150px; height: auto; margin-bottom: 10px;" />
          </div>
        </div>
      `,
        // ✅ This attaches the logo and makes it usable in the HTML via "cid"
        attachments: [
          {
            filename: "logo.png",
            path: "./assets/logo.png", // Ensure this path points to your actual logo file
            cid: "aviratlogo", // Must match the src="cid:aviratlogo" in HTML
          },
        ],
      };

      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Lead: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      };

          await transporter.verify();

      // Fire and forget
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(clientMailOptions),
      ]);

      console.log(`✅ Emails sent successfully for ${name}`);
      transporter.close(); // Close pool
    } catch (error) {
      console.error("❌ Background Mail Error:", error);
    }
  };

  // Execute the async function without 'await' so the route finishes instantly
  sendBackgroundEmails();
});

/* ============================================================
   ✅ FETCH TECH NEWS FUNCTION (Dev.to + RSS)
   ============================================================ */
const fetchTechNews = async () => {
  console.log("Fetching latest tech news...");

  try {
    const allArticles = [];

    /* ---------------------------
       1) Fetch from Dev.to API
       --------------------------- */
    const tags = ["devops", "security", "webdev", "startup", "ai"];

    const devToPromises = tags.map((tag) =>
      fetch(`https://dev.to/api/articles?tag=${tag}&top=7&per_page=3`).then(
        (res) => res.json(),
      ),
    );

    const devToResults = await Promise.all(devToPromises);

    const devToArticles = devToResults.flat().map((article) => ({
      id: article.id.toString(),
      title: article.title,
      date: new Date(article.published_at),
      excerpt: article.description,
      image:
        article.cover_image ||
        article.social_image ||
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      url: article.url,
      tags: article.tag_list,
      author: article.user?.name || "Unknown",
      source: "Dev.to",
      content: article.body_html || article.body_markdown || "",
    }));

    allArticles.push(...devToArticles);

    /* ---------------------------
       2) Fetch RSS Feeds
       --------------------------- */
    const rssFeeds = [
      "https://techcrunch.com/feed/",
      "https://www.theverge.com/rss/index.xml",
      // "https://www.wired.com/feed/rss" // optional
    ];

    for (const feedUrl of rssFeeds) {
      try {
        const feed = await parser.parseURL(feedUrl);

        const rssArticles = feed.items.slice(0, 5).map((item) => ({
          id: item.guid || item.link,
          title: item.title,
          date: new Date(item.pubDate || Date.now()),
          excerpt:
            item.contentSnippet || item.content || "No excerpt available",
          image:
            item.enclosure?.url ||
            "https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800&q=80",
          url: item.link,
          tags: item.categories || [],
          author: item.creator || feed.title || "Unknown",
          source: feed.title || "RSS Feed",
          content: item.content || item.contentSnippet || "",
        }));

        allArticles.push(...rssArticles);
      } catch (err) {
        console.error(`Error fetching RSS feed ${feedUrl}:`, err.message);
      }
    }

    /* ---------------------------
       3) Remove Duplicates
       --------------------------- */
    const uniqueArticles = Array.from(
      new Map(allArticles.map((item) => [item.id, item])).values(),
    );

    /* ---------------------------
       4) Sort by Newest
       --------------------------- */
    uniqueArticles.sort((a, b) => b.date - a.date);

    /* ---------------------------
       5) Update Cache (Top 50)
       --------------------------- */
    cachedBlogs = uniqueArticles.slice(0, 50).map((article) => ({
      ...article,
      date: article.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));

    console.log(`Updated news cache with ${cachedBlogs.length} articles.`);
  } catch (error) {
    console.error("Error in fetchTechNews:", error.message);
  }
}; // app

/* ============================================================
   ✅ CRON JOB (Auto update every 1 hour)
   ============================================================ */
cron.schedule("0 * * * *", () => {
  fetchTechNews();
});

/* ✅ Initial Fetch */
fetchTechNews();

/* ============================================================
   ✅ BLOG ENDPOINTS
   ============================================================ */

// Return cached blogs
app.get("/api/blogs", (req, res) => {
  res.json(cachedBlogs);
});

// Return single blog
app.get("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;

  // Check cache first
  const cachedArticle = cachedBlogs.find(
    (blog) => blog.id === id || blog.id.toString() === id,
  );

  if (cachedArticle) {
    return res.json(cachedArticle);
  }

  // Fallback for Dev.to article fetch
  if (!isNaN(id)) {
    try {
      const response = await fetch(`https://dev.to/api/articles/${id}`);

      if (!response.ok) {
        return res.status(404).json({ error: "Article not found" });
      }

      const article = await response.json();

      const blogDetail = {
        id: article.id.toString(),
        title: article.title,
        date: new Date(article.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        content: article.body_html || article.body_markdown,
        image: article.cover_image || article.social_image,
        tags: article.tag_list || [],
        author: article.user?.name || "Unknown",
        authorImage: article.user?.profile_image || "",
        url: article.url,
      };

      return res.json(blogDetail);
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error.message);
      return res.status(500).json({ error: "Server error fetching article" });
    }
  }

  return res.status(404).json({ error: "Article not found" });
});

/* ============================================================
   ✅ START SERVER
   ============================================================ */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
