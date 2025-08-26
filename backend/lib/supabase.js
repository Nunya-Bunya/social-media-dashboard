const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;
const supabaseServiceKey = config.supabase.serviceRoleKey;

// Create Supabase client for public operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create Supabase client for admin operations (with service role key)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

module.exports = {
  supabase,
  supabaseAdmin
};


