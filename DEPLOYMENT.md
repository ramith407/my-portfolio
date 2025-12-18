# 🚀 Deployment Guide

## Pre-Deployment Checklist

### ⚠️ CRITICAL - Security
- [ ] Revoke old Gmail app password at https://myaccount.google.com/apppasswords
- [ ] Generate NEW app password
- [ ] Update `.env` with new password (DO NOT COMMIT)
- [ ] Verify `.env` is in `.gitignore`

### 🧪 Testing Locally

#### Backend Testing
```bash
cd portfolio-backend
npm install
npm run dev

# Test endpoints:
# http://localhost:5000/api/health
# http://localhost:5000/api/projects
# http://localhost:5000/api/leetcode/YOUR_USERNAME
```

#### Frontend Testing
```bash
cd portfolio-frontend
npm install
npm start

# Should open at http://localhost:3000
# Test contact form
# Verify LeetCode stats load
```

#### Contact Form Test
1. Fill out contact form
2. Check your email (ramithnaik8@gmail.com)
3. Verify email received

## 🌐 Deployment Steps

### Option 1: Vercel (Recommended - Free)

#### Deploy Backend
1. Go to https://vercel.com
2. Import `portfolio-backend` folder
3. Add Environment Variables in Vercel Dashboard:
   ```
   EMAIL_USER=ramithnaik8@gmail.com
   EMAIL_PASS=your_new_app_password
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
4. Deploy
5. Copy backend URL (e.g., `https://your-backend.vercel.app`)

#### Deploy Frontend
1. Update `portfolio-frontend/.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```
2. Import `portfolio-frontend` folder to Vercel
3. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```
4. Deploy
5. Copy frontend URL

#### Update CORS
1. Go back to backend Vercel dashboard
2. Add frontend URL to `FRONTEND_URL` environment variable
3. Redeploy backend

### Option 2: Render + Netlify

#### Backend (Render - Free)
1. Go to https://render.com
2. Create Web Service
3. Connect GitHub repo
4. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add Environment Variables (same as above)

#### Frontend (Netlify - Free)
1. Go to https://netlify.com
2. Drag & drop `portfolio-frontend/build` folder
3. Or connect GitHub repo
4. Add Environment Variables

## 📋 Post-Deployment Testing

### Test Checklist
- [ ] Backend health check: `https://your-backend.vercel.app/api/health`
- [ ] Projects API: `https://your-backend.vercel.app/api/projects`
- [ ] LeetCode API: `https://your-backend.vercel.app/api/leetcode/ramith407`
- [ ] Frontend loads correctly
- [ ] Contact form works (sends email)
- [ ] LeetCode stats display
- [ ] All links work
- [ ] Mobile responsive

### Test Contact Form
```bash
curl -X POST https://your-backend.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

## 🔧 Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` environment variable is set correctly
- Check browser console for blocked origin
- Update `allowedOrigins` in `server.js`

### Email Not Sending
- Verify Gmail app password is correct
- Check Gmail "Less secure app access" is OFF (should use app password)
- Check Vercel/Render logs for errors

### Build Errors
- Run `npm run build` locally first
- Check for missing dependencies
- Verify Node version (18+)

## 🎯 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Update CORS origins in backend

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

## 📊 Monitoring

- Check Vercel/Render logs for errors
- Monitor email delivery
- Set up Google Analytics (optional)

## 🔐 Security Best Practices

- Never commit `.env` files
- Rotate app passwords regularly
- Use HTTPS only in production
- Add rate limiting for contact form
- Monitor for abuse

## 📝 URLs to Update After Deployment

In `portfolio-backend/server.js`:
```javascript
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      process.env.FRONTEND_URL,
      'https://YOUR-ACTUAL-DOMAIN.vercel.app', // ← UPDATE THIS
    ]
```

In `portfolio-frontend/.env.production`:
