const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
    // Create a transporter
    // For production, use real SMTP credentials in .env
    // For development/demo, we'll log the email or use Ethereal
    
    // Example with Gmail (requires App Password):
    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    */

    // For this demo, we will simulate sending by logging to console
    console.log('--- New Contact Form Submission ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    // In a real app, you would await transporter.sendMail(...) here
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Blog Posts Endpoint
app.get('/api/blogs', async (req, res) => {
  try {
    // Fetch articles from multiple relevant tags to satisfy user requirements:
    // "devops, cyber security, company new"
    const tags = ['devops', 'security', 'webdev', 'startup'];
    
    // Fetch 2 articles from each tag to ensure variety
    const fetchPromises = tags.map(tag => 
      fetch(`https://dev.to/api/articles?tag=${tag}&top=7&per_page=2`).then(res => res.json())
    );

    const results = await Promise.all(fetchPromises);
    
    // Flatten and remove duplicates (by id)
    const allArticles = results.flat();
    const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.id, item])).values());
    
    // Sort by date (newest first) or shuffle. Let's sort by published_at
    uniqueArticles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    // Transform data to match our frontend structure
    const blogs = uniqueArticles.map(article => ({
      id: article.id,
      title: article.title,
      date: new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      excerpt: article.description,
      image: article.cover_image || article.social_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      url: article.url, // Original URL, but we will use ID for internal routing
      tags: article.tag_list,
      author: article.user.name,
      source: 'Dev.to'
    }));

    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Single Blog Post Endpoint
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://dev.to/api/articles/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
         return res.status(404).json({ error: 'Article not found' });
      }
      throw new Error('Failed to fetch article');
    }

    const article = await response.json();
    
    // Transform to our format
    const blogDetail = {
      id: article.id,
      title: article.title,
      date: new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      content: article.body_html || article.body_markdown, // Dev.to provides rendered HTML
      image: article.cover_image || article.social_image,
      tags: article.tags,
      author: article.user.name,
      authorImage: article.user.profile_image,
      url: article.url
    };

    res.json(blogDetail);
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch blog details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
