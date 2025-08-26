# Social Media Dashboard Backend

A complete Express.js backend server for a social media dashboard application with authentication, posts, comments, likes, and user following system.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Social Media Posts**: Create, read, update, delete posts with image support
- **Comments System**: Nested comments with threading support
- **Like System**: Like/unlike posts functionality
- **User Following**: Follow/unfollow other users
- **User Profiles**: User search, profile management, and statistics
- **Supabase Integration**: PostgreSQL database with real-time capabilities
- **RESTful API**: Clean, well-structured API endpoints
- **Security**: JWT tokens, password hashing, CORS support

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcryptjs
- **CORS**: Cross-origin resource sharing
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
backend/
├── config.js              # Configuration and environment variables
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── lib/
│   └── supabase.js        # Supabase client configuration
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── posts.js           # Post management routes
│   ├── comments.js        # Comment management routes
│   └── users.js           # User management routes
└── database/
    └── schema.sql         # Database schema
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
3. Update the `.env` file with your Supabase credentials

### 4. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## 📱 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (authenticated)
- `PUT /profile` - Update user profile (authenticated)

### Posts (`/api/posts`)
- `GET /` - Get all posts (with pagination)
- `GET /:id` - Get specific post
- `POST /` - Create new post (authenticated)
- `PUT /:id` - Update post (authenticated)
- `DELETE /:id` - Delete post (authenticated)
- `POST /:id/like` - Like/unlike post (authenticated)

### Comments (`/api/comments`)
- `GET /post/:postId` - Get comments for a post
- `POST /` - Create new comment (authenticated)
- `PUT /:id` - Update comment (authenticated)
- `DELETE /:id` - Delete comment (authenticated)

### Users (`/api/users`)
- `GET /search` - Search users
- `GET /profile/:username` - Get user profile by username
- `POST /follow/:userId` - Follow user (authenticated)
- `DELETE /follow/:userId` - Unfollow user (authenticated)
- `GET /:userId/followers` - Get user's followers
- `GET /:userId/following` - Get user's following
- `GET /:userId/following-status` - Check following status (authenticated)

### System
- `GET /api/health` - Health check
- `GET /api/test` - Test endpoint with feature list

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📊 Database Schema

The database includes the following tables:
- **users**: User accounts and profiles
- **posts**: Social media posts
- **comments**: Post comments with threading
- **likes**: Post likes
- **follows**: User following relationships

## 🧪 Testing the API

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Test Endpoint
```bash
curl http://localhost:5000/api/test
```

### 3. User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser",
    "full_name": "Test User"
  }'
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "message": "Detailed error information (development only)"
}
```

## 🔧 Development

- **nodemon**: Auto-restart on file changes
- **ESLint**: Code quality and consistency
- **Environment variables**: Secure configuration management

## 📝 Notes

- All timestamps are in ISO format with timezone
- UUIDs are used for all primary keys
- Soft deletes are not implemented (cascade deletes)
- Image uploads require external storage (not included)
- Rate limiting is not implemented (consider adding for production)

## 🤝 Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Test all endpoints before committing

## 📄 License

ISC License
