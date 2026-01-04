const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cron = require('node-cron');
const Parser = require('rss-parser');

dotenv.config();

const app = express();
const parser = new Parser();
const PORT = process.env.PORT || 5000;

// In-memory cache for blogs
let cachedBlogs = [];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Avira Tech API is running');
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Zoho Mail Transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER || 'avira.tech@zohomail.in',
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'avira.tech@zohomail.in',
      to: 'avira.tech@zohomail.in',
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Fetch News Function
const fetchTechNews = async () => {
  console.log('Fetching latest tech news...');
  try {
    const allArticles = [];

    // 1. Fetch from Dev.to
    const tags = ['devops', 'security', 'webdev', 'startup', 'ai'];
    const devToPromises = tags.map(tag => 
      fetch(`https://dev.to/api/articles?tag=${tag}&top=7&per_page=3`).then(res => res.json())
    );

    const devToResults = await Promise.all(devToPromises);
    const devToArticles = devToResults.flat().map(article => ({
      id: article.id.toString(),
      title: article.title,
      date: new Date(article.published_at),
      excerpt: article.description,
      image: article.cover_image || article.social_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      url: article.url,
      tags: article.tag_list,
      author: article.user.name,
      source: 'Dev.to',
      content: article.body_html || article.body_markdown // Cache content for details view
    }));
    allArticles.push(...devToArticles);

    // 2. Fetch from RSS Feeds
    const rssFeeds = [
      'https://techcrunch.com/feed/',
      'https://www.theverge.com/rss/index.xml',
      // 'https://www.wired.com/feed/rss' // Optional
    ];

    for (const feedUrl of rssFeeds) {
      try {
        const feed = await parser.parseURL(feedUrl);
        const rssArticles = feed.items.slice(0, 5).map(item => ({
          id: item.guid || item.link,
          title: item.title,
          date: new Date(item.pubDate),
          excerpt: item.contentSnippet || item.content,
          image: item.enclosure?.url || 'https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800&q=80', // Fallback image
          url: item.link,
          tags: item.categories || [],
          author: item.creator || feed.title,
          source: feed.title,
          content: item.content || item.contentSnippet
        }));
        allArticles.push(...rssArticles);
      } catch (err) {
        console.error(`Error fetching RSS feed ${feedUrl}:`, err.message);
      }
    }

    // Remove duplicates
    const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.id, item])).values());

    // Sort by date (newest first)
    uniqueArticles.sort((a, b) => b.date - a.date);

    // Update Cache (Keep top 50)
    cachedBlogs = uniqueArticles.slice(0, 50).map(article => ({
      ...article,
      date: article.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }));

    console.log(`Updated news cache with ${cachedBlogs.length} articles.`);
  } catch (error) {
    console.error('Error in fetchTechNews:', error);
  }
};

// Schedule Auto-Update (Every 1 hour)
cron.schedule('0 * * * *', () => {
  fetchTechNews();
});

// Initial Fetch
fetchTechNews();

// Blog Posts Endpoint (Returns Cached Data)
app.get('/api/blogs', (req, res) => {
  res.json(cachedBlogs);
});

// Single Blog Post Endpoint
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  
  // Check cache first
  const cachedArticle = cachedBlogs.find(blog => blog.id === id || blog.id.toString() === id);
  
  if (cachedArticle) {
    return res.json(cachedArticle);
  }

  // Fallback for Dev.to if not in cache (e.g. old link)
  if (!isNaN(id)) {
    try {
      const response = await fetch(`https://dev.to/api/articles/${id}`);
      if (!response.ok) {
        return res.status(404).json({ error: 'Article not found' });
      }
      const article = await response.json();
      const blogDetail = {
        id: article.id.toString(),
        title: article.title,
        date: new Date(article.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        content: article.body_html || article.body_markdown,
        image: article.cover_image || article.social_image,
        tags: article.tags,
        author: article.user.name,
        authorImage: article.user.profile_image,
        url: article.url
      };
      return res.json(blogDetail);
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
    }
  }

  res.status(404).json({ error: 'Article not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
