'use client'

import { useStore } from '@/store'
import { SubmitButton } from '../sign-out-button'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { supabase } from '@/lib/utils'

export default function DesktopSidebarUserMenu() {
  const { user, setUser } = useStore()

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    } else {
      setUser(null)
    }
  }

  return (
    <div className='mt-auto w-full'>
      <Popover>
        <PopoverTrigger className='w-full' asChild>
          <Button className='shadow-none flex gap-3 w-full bg-navbar hover:bg-navbar-link text-navbar-text hover:text-white'>
            <span className='flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full text-sm font-semibold'>
              {user?.email?.slice(0, 2).toUpperCase()}
            </span>
            <span className='flex-1 text-left truncate'>{user?.email}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button onClick={signOut}>Sign out</Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
