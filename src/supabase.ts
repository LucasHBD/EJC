import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://uvdhfrbhgsivitqmptfn.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ez6BneuH46Rzp_b0HdB3Lg__suryhVJ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);