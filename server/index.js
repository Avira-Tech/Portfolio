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

let primaryBlogs = [];
let backupBlogs = [];

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

// Quote Request Endpoint
app.post('/api/quote', async (req, res) => {
  const { name, email, phone, company, serviceType, budget, timeline, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'avira.tech@zohomail.in',
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'avira.tech@zohomail.in',
      to: 'avira.tech@zohomail.in',
      replyTo: email,
      subject: `New Quote Request: ${serviceType} - ${name}`,
      text: `
        New Quote Request

        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Company: ${company || 'Not provided'}
        
        Project Details:
        Service Type: ${serviceType}
        Budget: ${budget}
        Timeline: ${timeline}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Quote Request</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0;">Client Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          </div>

          <div style="background: #e6f7ff; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0;">Project Specs</h3>
            <p><strong>Service Type:</strong> ${serviceType}</p>
            <p><strong>Budget Range:</strong> ${budget}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
          </div>

          <div>
            <h3>Project Description</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Quote request sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send quote request' });
  }
});

/* ================= BLOG FETCH ================= */

let currentBlogs = [];
let blogQueue = [];

const fetchTechNews = async () => {
  try {
    // Fetch from Dev.to
    const tags = ['webdev', 'javascript', 'react', 'programming', 'technology', 'ai'];
    // Randomize tag order to get variety
    const shuffledTags = tags.sort(() => 0.5 - Math.random());
    
    // Fetch more initially to ensure we have enough valid ones with images
    const fetchPromises = shuffledTags.slice(0, 3).map(tag => 
      fetch(`https://dev.to/api/articles?tag=${tag}&per_page=5&top=1`)
        .then(res => res.json())
        .catch(err => {
          console.error(`Error fetching tag ${tag}:`, err);
          return [];
        })
    );

    const results = await Promise.all(fetchPromises);
    
    // Flatten and deduplicate by ID
    const uniqueArticles = new Map();
    results.flat().forEach(article => {
      if (article && article.id && !uniqueArticles.has(article.id)) {
        uniqueArticles.set(article.id, article);
      }
    });

    const articles = Array.from(uniqueArticles.values())
      .filter(article => 
        (article.cover_image || article.social_image) && 
        article.description && 
        article.title
      )
      .map(article => ({
        id: article.id.toString(),
        title: article.title,
        excerpt: article.description,
        content: article.body_html || article.description, // Dev.to provides body_html sometimes
        author: article.user.name,
        authorImage: article.user.profile_image,
        date: new Date(article.published_at).toLocaleDateString(),
        tags: article.tag_list,
        image: article.cover_image || article.social_image,
        url: article.url
      }));

    // Return only 6 as requested
    return articles.slice(0, 6);
  } catch (error) {
    console.error('Error in fetchTechNews:', error);
    return [];
  }
};

const updateBlogRotation = async () => {
  console.log('Rotating blogs...');
  
  // If queue is empty or low, fetch new batch of 6
  if (blogQueue.length <= 3) {
    console.log('Queue low, fetching 6 new blogs...');
    const newBlogs = await fetchTechNews();
    if (newBlogs.length > 0) {
      blogQueue = [...blogQueue, ...newBlogs];
      console.log(`Added ${newBlogs.length} blogs to queue.`);
    }
  }

  // Move top 3 from queue to display
  if (blogQueue.length > 0) {
    currentBlogs = blogQueue.slice(0, 3);
    blogQueue = blogQueue.slice(3); // Remove the displayed ones from queue
    console.log('Updated current display blogs.');
  } else {
    console.log('No blogs in queue to display.');
  }
};

// Initial fetch
updateBlogRotation();

// Schedule rotation every 30 minutes
cron.schedule('*/30 * * * *', () => {
  updateBlogRotation();
});

// Blog Endpoints
app.get('/api/blogs', (req, res) => {
  res.json(currentBlogs);
});

app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  
  // Check current blogs first
  let blog = currentBlogs.find(b => b.id === id);
  if (!blog) {
    blog = blogQueue.find(b => b.id === id);
  }

  // If we have the blog and it's already marked as having full content, return it
  if (blog && blog.isFullContent) {
    console.log(`Returning cached full content for blog ${id}`);
    return res.json(blog);
  }

  console.log(`Fetching full content for blog ${id} from Dev.to...`);

  // Otherwise, try to fetch the full article from Dev.to to get the body_html
  try {
    const response = await fetch(`https://dev.to/api/articles/${id}`);
    if (response.ok) {
      const article = await response.json();
      console.log(`Fetched article ${id}, body_html length: ${article.body_html?.length || 0}`);
      
      const formattedBlog = {
        id: article.id.toString(),
        title: article.title,
        excerpt: article.description,
        content: article.body_html, // This is the full content
        author: article.user.name,
        authorImage: article.user.profile_image,
        date: new Date(article.published_at).toLocaleDateString(),
        tags: article.tag_list,
        image: article.cover_image || article.social_image,
        url: article.url,
        isFullContent: true
      };

      // Update the blog in memory if it exists, so we don't fetch again
      if (blog) {
        Object.assign(blog, formattedBlog);
      }

      return res.json(formattedBlog);
    } else {
      console.error(`Failed to fetch article ${id}: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching single blog:', error);
  }

  // Fallback: If fetch failed but we have the blog in memory (even if partial), return it
  if (blog) {
    return res.json(blog);
  }

  res.status(404).json({ error: 'Blog not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});