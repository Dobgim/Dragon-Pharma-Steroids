import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://htzmpmhoderdkzwgmqti.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0em1wbWhvZGVyZGt6d2dtcXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0OTAwNDQsImV4cCI6MjA5NzA2NjA0NH0.WLDgAXYjbhZUepnwBDlAvFAxDwbzew4DLeAX0vLqWuY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
