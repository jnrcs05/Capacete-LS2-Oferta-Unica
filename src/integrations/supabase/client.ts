// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://cgxjccopysejzcvwozsm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNneGpjY29weXNlanpjdndvenNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1ODc2MDMsImV4cCI6MjA0NzE2MzYwM30.uI1d-LOpYX60DUwyFAn4qQEOX0lrrA68iD5VSGVzcrk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);