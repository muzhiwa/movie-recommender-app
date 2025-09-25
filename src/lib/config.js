import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";


if (!process.env.REACT_APP_OPENAI_API_KEY) {
  throw new Error("REACT_APP_OPENAI_API_KEY is missing in .env");
}

export const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, 
});

// Supabase config
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
