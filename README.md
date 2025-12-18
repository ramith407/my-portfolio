# 💼 Portfolio Website

Modern, responsive portfolio website showcasing projects, skills, and coding profiles with real-time LeetCode statistics integration.

## ✨ Features

- 🎨 Modern, responsive design with animated backgrounds
- 📊 Real-time LeetCode statistics integration
- 📧 Working contact form with email notifications
- 🚀 Fast and optimized performance
- 📱 Mobile-friendly responsive layout
- 🎯 Clean, professional UI/UX

## 🛠️ Tech Stack

### Frontend
- React 18
- CSS3 with animations
- Responsive design

### Backend
- Node.js
- Express.js
- Nodemailer (email)
- Axios (LeetCode API)

## 📁 Project Structure

```bash
portfolio-frontend/   # Frontend code
  ├── public/         # Public assets
  ├── src/            # React components and hooks
  ├── .env             # Environment variables
  └── package.json     # Dependencies and scripts

portfolio-backend/    # Backend code
  ├── config/         # Configuration files
  ├── controllers/    # Request handlers
  ├── middleware/     # Custom middleware
  ├── models/         # Database models
  ├── routes/         # API routes
  ├── .env             # Environment variables
  └── package.json     # Dependencies and scripts
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- npm/yarn
- MongoDB Atlas account (for database)
- Gmail account (for email notifications)

### Backend Setup

1. Clone the repo
   ```bash
   git clone https://github.com/yourusername/portfolio-backend.git
   ```
2. Install npm packages
   ```bash
   cd portfolio-backend
   npm install
   ```
3. Set up environment variables in a `.env` file
   ```env
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   FRONTEND_URL=http://localhost:3000
   ```
4. Run the development server
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Clone the repo
   ```bash
   git clone https://github.com/yourusername/portfolio-frontend.git
   ```
2. Install npm packages
   ```bash
   cd portfolio-frontend
   npm install
   ```
3. Set up environment variables in a `.env` file
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Run the development server
   ```bash
   npm start
   ```

## 📧 Contact

For any inquiries, please email me at [your-email@gmail.com](mailto:your-email@gmail.com).
