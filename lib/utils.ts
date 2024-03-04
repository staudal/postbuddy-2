import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const supabase = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
});
