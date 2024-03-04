import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { User, createClient } from '@supabase/supabase-js'
import { toast } from 'sonner'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string
export const supabase = createClient(supabaseUrl, supabaseKey)
