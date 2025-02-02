import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";
export const supabaseUrl = "https://vaqclgxizurolsmejiol.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcWNsZ3hpenVyb2xzbWVqaW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNDk2MTUsImV4cCI6MjA1MzkyNTYxNX0.bTQFRG2uDg14eBMD61EmUwGyprN0zR4R0ukNxjrufos";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
