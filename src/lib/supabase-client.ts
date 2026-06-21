import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://blitracqgaggxuypqbpo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsaXRyYWNxZ2FnZ3h1eXBxYnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5ODU1MjgsImV4cCI6MjA4OTU2MTUyOH0.vAwSRoqGk-nL0BfnXL6-rSSM6MQS6dWcoghLimdVIVs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
