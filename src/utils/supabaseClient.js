import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jmjgexhqdyjikbuhfjke.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptamdleGhxZHlqaWtidWhmamtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MzI3NTQsImV4cCI6MjEwNTUwODc1NH0.KvighWYAuRDZNCq4FCRjm4_GhuiC0h0shTmx7u-jlng';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
