# 🚀 Deploy to Railway

## Quick Setup (5 minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will auto-detect it's a Node.js app

### 3. Add Environment Variables
In Railway dashboard, add these environment variables:
```
DATABASE_URL=your-postgresql-url
PORT=3001
NODE_ENV=production
```

### 4. Get Your Live URL
Railway will give you a URL like: `https://your-app-name.railway.app`

### 5. Update Frontend
Update your frontend's API URL to point to the Railway URL:
```javascript
// In your frontend config
NEXT_PUBLIC_API_URL=https://your-app-name.railway.app/api
```

## Alternative: Render (Free)

1. Go to [render.com](https://render.com)
2. Connect GitHub
3. Create new Web Service
4. Select your repo
5. Set build command: `npm install`
6. Set start command: `node simple-server.js`
7. Deploy!

## Alternative: Heroku

1. Install Heroku CLI
2. Run: `heroku create your-app-name`
3. Run: `git push heroku main`
4. Set environment variables in Heroku dashboard

## Cost Comparison
- **Railway**: $5/month (recommended)
- **Render**: Free tier available
- **Heroku**: $7/month
- **DigitalOcean**: $5/month

## Benefits of Cloud Deployment
✅ No local server issues
✅ Always available
✅ Professional URLs
✅ Built-in SSL
✅ Easy scaling
✅ Database included
✅ Automatic deployments
