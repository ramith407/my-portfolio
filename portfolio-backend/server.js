const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios'); // ✅ FIXED - Added axios properly at the top
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      process.env.FRONTEND_URL,
      'https://my-portfolio-brown-eta.vercel.app' // Your backend URL (for self-testing)
    ]
  : [
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample projects data (in production, this would come from a database)
const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing my projects, skills, and coding profile. Built with React and Node.js, featuring a clean UI with animated backgrounds, LeetCode stats integration, and a contact form.',
    technologies: ['React', 'Node.js', 'Express', 'CSS3', 'JavaScript'],
    github: 'https://github.com/ramith407/my-portfolio',
    demo: 'https://your-portfolio-demo.com'
  },
  {
    id: 2,
    title: 'AI-Powered Travel Assistant',
    description: 'I recently built an AI-powered travel assistant for my engineering project that integrates real-time translation, AR-based navigation, safety alerts, and local insights. I designed the system end-to-end: from identifying the user problem, to building the prototype using Python, OpenCV, and MediaPipe, to validating it with real user scenarios. I also created multiple computer vision mini-projects on my own, such as gesture-controlled games and a hand-gesture-to-text converter using MediaPipe and SVM. These projects reflect my ability to learn fast, experiment independently, and translate ideas into functional prototypes.',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'SVM', 'Computer Vision', 'AR'],
    github: 'https://github.com/ramith407/ai-travel-assistant',
    demo: 'https://your-travel-assistant-demo.com'
  }
];

// API Routes

// Get all projects
app.get('/api/projects', (req, res) => {
  try {
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Get single project by ID
app.get('/api/projects/:id', (req, res) => {
  try {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Configure email transporter (using Gmail as example)
    // In production, use environment variables for credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or app password
      }
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Log to console (in production, save to database). Do not log full message to avoid PII in logs.
    console.log('Contact form submission:', { name, email, timestamp: new Date() });

    res.status(200).json({ 
      message: 'Message sent successfully',
      data: { name, email }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.',
      error: error.message 
    });
  }
});

// Add new project (protected route - in production, add authentication)
app.post('/api/projects', (req, res) => {
  try {
    const { title, description, technologies, github, demo } = req.body;

    if (!title || !description || !technologies) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProject = {
      id: projects.length + 1,
      title,
      description,
      technologies,
      github,
      demo
    };

    projects.push(newProject);
    res.status(201).json({ message: 'Project added successfully', project: newProject });

  } catch (error) {
    res.status(500).json({ message: 'Error adding project', error: error.message });
  }
});

// Delete project (protected route - in production, add authentication)
app.delete('/api/projects/:id', (req, res) => {
  try {
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    projects.splice(projectIndex, 1);
    res.json({ message: 'Project deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

// ✅ LEETCODE ENDPOINTS - Moved BEFORE 404 handler

// LeetCode Stats Endpoint
app.get('/api/leetcode/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // GraphQL query to fetch LeetCode user stats
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
        recentSubmissionList(username: $username, limit: 10) {
          title
          statusDisplay
          lang
          timestamp
        }
      }
    `;

    // Make request to LeetCode GraphQL API
    const response = await axios.post('https://leetcode.com/graphql', {
      query,
      variables: { username }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      }
    });

    const data = response.data.data;

    if (!data.matchedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Parse the submission statistics
    const submissions = data.matchedUser.submitStats.acSubmissionNum;
    const allQuestions = data.allQuestionsCount;

    // Extract stats by difficulty
    const easySolved = submissions.find(s => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = submissions.find(s => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = submissions.find(s => s.difficulty === 'Hard')?.count || 0;
    const totalSolved = submissions.find(s => s.difficulty === 'All')?.count || 0;

    const totalEasy = allQuestions.find(q => q.difficulty === 'Easy')?.count || 0;
    const totalMedium = allQuestions.find(q => q.difficulty === 'Medium')?.count || 0;
    const totalHard = allQuestions.find(q => q.difficulty === 'Hard')?.count || 0;
    const totalQuestions = allQuestions.find(q => q.difficulty === 'All')?.count || 0;

    // Format recent submissions
    const recentSubmissions = data.recentSubmissionList?.map(sub => ({
      title: sub.title,
      status: sub.statusDisplay,
      language: sub.lang,
      timestamp: new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString()
    })) || [];

    // Prepare response
    const stats = {
      username: data.matchedUser.username,
      ranking: data.matchedUser.profile?.ranking || null,
      reputation: data.matchedUser.profile?.reputation || 0,
      totalSolved,
      totalQuestions,
      easySolved,
      totalEasy,
      mediumSolved,
      totalMedium,
      hardSolved,
      totalHard,
      recentSubmissions,
      lastFetched: new Date().toISOString()
    };

    res.json(stats);

  } catch (error) {
    console.error('Error fetching LeetCode stats:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        message: 'Error fetching data from LeetCode',
        error: error.response.data 
      });
    }

    res.status(500).json({ 
      message: 'Failed to fetch LeetCode stats',
      error: error.message 
    });
  }
});

// Alternative: Using LeetCode API (if GraphQL doesn't work)
app.get('/api/leetcode/alt/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Using public LeetCode API
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    
    const data = response.data;

    const stats = {
      username: data.username || username,
      ranking: data.ranking || null,
      totalSolved: data.totalSolved || 0,
      totalQuestions: data.totalQuestions || 0,
      easySolved: data.easySolved || 0,
      totalEasy: data.totalEasy || 0,
      mediumSolved: data.mediumSolved || 0,
      totalMedium: data.totalMedium || 0,
      hardSolved: data.hardSolved || 0,
      totalHard: data.totalHard || 0,
      acceptanceRate: data.acceptanceRate || 0,
      recentSubmissions: [],
      lastFetched: new Date().toISOString()
    };

    res.json(stats);

  } catch (error) {
    console.error('Error fetching LeetCode stats (alt):', error.message);
    res.status(500).json({ 
      message: 'Failed to fetch LeetCode stats',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// ✅ 404 handler - MUST BE AFTER all routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ✅ Start server - MUST BE AT THE END
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});