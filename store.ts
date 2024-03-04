import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface Store {
  user: User | null
  setUser: (user: User | null) => void
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))
