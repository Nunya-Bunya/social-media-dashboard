# 🚀 Backend Setup Guide

## Step 1: Create Environment File

Create a `.env` file in the backend folder with your Supabase credentials:

```bash
# Navigate to backend folder
cd backend

# Create .env file
touch .env
```

Add the following content to your `.env` file:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=24h

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Step 2: Set up Supabase Database

### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready

### 2.2 Get Your Credentials
1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 2.3 Run Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire content from `database/schema.sql`
3. Paste it in the SQL editor
4. Click **Run** to execute the schema

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
🚀 Server is running on port 3001
🌍 Environment: development
🔗 Health check: http://localhost:3001/api/health
🧪 Test endpoint: http://localhost:3001/api/test
📱 API Base URL: http://localhost:3001/api
```

## Step 5: Test the API

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Test Endpoint
```bash
curl http://localhost:3001/api/test
```

### User Registration (Test)
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser",
    "full_name": "Test User"
  }'
```

## Troubleshooting

### Port Already in Use
If you get a port conflict, change the PORT in your `.env` file:
```env
PORT=3002
```

### Supabase Connection Issues
1. Verify your credentials are correct
2. Check if your Supabase project is active
3. Ensure the database schema was run successfully

### JWT Secret
Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Next Steps
Once everything is working:
1. Test all API endpoints
2. Set up your frontend application
3. Configure CORS if needed
4. Add rate limiting for production


