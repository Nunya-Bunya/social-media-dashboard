# 🚀 Deployment Guide

## Quick Deploy to Vercel (Recommended)

### 1. Prepare for Deployment
```bash
# Build the project locally to test
npm run build

# If build succeeds, you're ready to deploy
```

### 2. Deploy to Vercel
1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
   NEXT_PUBLIC_AUTH_ENABLED=true
   NEXT_PUBLIC_DEMO_EMAIL=test@example.com
   NEXT_PUBLIC_DEMO_PASSWORD=password
   ```

3. **Deploy**:
   - Vercel will automatically detect Next.js
   - Click "Deploy"
   - Your app will be live in minutes!

## Alternative Deployment Options

### Netlify
```bash
# Build command
npm run build

# Publish directory
out

# Environment variables (same as Vercel)
```

### Railway
1. Connect GitHub repository
2. Railway auto-detects Next.js
3. Add environment variables
4. Deploy automatically

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Environment Variables

### Required
- `NEXT_PUBLIC_API_URL`: Your backend API URL

### Optional
- `NEXT_PUBLIC_AUTH_ENABLED`: Enable/disable authentication (default: true)
- `NEXT_PUBLIC_DEMO_EMAIL`: Demo login email (default: test@example.com)
- `NEXT_PUBLIC_DEMO_PASSWORD`: Demo login password (default: password)

## Backend Deployment

### Deploy Backend to Railway
1. Upload `ai-assistant-backend` folder to GitHub
2. Connect to Railway
3. Set environment variables:
   ```
   DATABASE_URL=your-database-url
   PORT=3001
   ```
4. Deploy

### Update Frontend API URL
After backend deployment, update `NEXT_PUBLIC_API_URL` in your frontend environment variables.

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend environment variables configured
- [ ] Database connected and migrated
- [ ] SSL certificates configured
- [ ] Domain configured (optional)
- [ ] Analytics tracking added (optional)
- [ ] Error monitoring configured (optional)

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### API Connection Issues
1. Check `NEXT_PUBLIC_API_URL` is correct
2. Verify backend is running
3. Check CORS configuration
4. Test API endpoints directly

### Performance Issues
1. Enable Next.js optimizations
2. Use CDN for static assets
3. Implement caching strategies
4. Monitor bundle size

## Support

For deployment issues:
1. Check Vercel/Netlify logs
2. Verify environment variables
3. Test locally first
4. Check browser console for errors
