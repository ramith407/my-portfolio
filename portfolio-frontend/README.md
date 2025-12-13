# Portfolio Website - Full Stack

A modern, full-stack portfolio website with React frontend and Node.js/Express backend featuring animated effects, contact form, and project showcase.

## 🚀 Features

- **Animated Background**: Particle effects with smooth animations
- **Responsive Design**: Works seamlessly on all devices
- **Contact Form**: Functional contact form with email integration
- **Projects API**: RESTful API for managing portfolio projects
- **Modern UI**: Gradient effects, hover animations, and glassmorphism
- **Smooth Scrolling**: Elegant navigation between sections

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for contact form email functionality)

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Configure environment variables:**
Edit `.env` file and add your credentials:
```env
PORT=5000
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

**Gmail Setup for Email:**
- Enable 2-Factor Authentication in your Google Account
- Go to Google Account → Security → 2-Step Verification → App Passwords
- Generate an app password for "Mail"
- Use that 16-character password in EMAIL_PASS

5. **Start the backend server:**
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### Frontend Setup

1. **Open new terminal and navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```
Frontend will run on `http://localhost:3000`

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Add new project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, message }`

### Health
- `GET /api/health` - Check server status

## 🎨 Customization

### Update Personal Information

**In `frontend/src/App.jsx`:**
- Replace "John Doe" with your name
- Update the tagline/description
- Modify social media links
- Update email in contact section

**In `backend/server.js`:**
- Update the projects array with your actual projects
- Modify project data structure as needed

### Styling

**Colors are defined in `frontend/src/App.css`:**
```css
:root {
  --primary: #00ffff;      /* Cyan */
  --secondary: #ff00ff;    /* Magenta */
  --accent: #00ff00;       /* Green */
  --bg-dark: #0a0a0a;      /* Background */
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
```bash
cd frontend
npm run build
```
2. Deploy the `build` folder to Vercel or Netlify
3. Update API endpoint URL in `App.jsx` to your backend URL

### Backend (Heroku/Railway/Render)
1. Push your backend code to Git
2. Deploy to your preferred platform
3. Set environment variables in platform settings
4. Update CORS origin to allow your frontend domain

## 📦 Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- Implement authentication for protected routes (add/delete projects)
- Add rate limiting for API endpoints
- Validate and sanitize all user inputs
- Use HTTPS in production

## 🐛 Troubleshooting

**CORS Issues:**
- Ensure backend CORS is configured correctly
- Check frontend is calling correct API URL

**Email not sending:**
- Verify Gmail app password is correct
- Check 2FA is enabled on Google account
- Ensure no typos in environment variables

**Port already in use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
```

## 📝 Future Enhancements

- [ ] Add database (MongoDB/PostgreSQL)
- [ ] Implement user authentication
- [ ] Add blog section with CMS
- [ ] Include analytics dashboard
- [ ] Add dark/light theme toggle
- [ ] Implement project search and filtering
- [ ] Add admin panel for content management
- [ ] Include resume download functionality

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own portfolio!

## 📧 Contact

For questions or suggestions, reach out via the contact form on the website!

---

**Built with ❤️ using React, Node.js, and modern web technologies**