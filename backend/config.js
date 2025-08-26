require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  supabase: {
    url: process.env.SUPABASE_URL || 'your_supabase_project_url_here',
    anonKey: process.env.SUPABASE_ANON_KEY || 'your_supabase_anon_key_here',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_supabase_service_role_key_here'
  }
};
