'use client'

import { cn, supabase } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  page: 'login' | 'signup'
}

export function UserAuthForm({ page, className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')

  async function login(email: string) {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard/campaigns'
      }
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
    } else {
      toast.success('Check your email for the login link.')
      setLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className='grid gap-2'>
        <div className='grid gap-1'>
          <Label className='sr-only' htmlFor='email'>
            Email
          </Label>
          <Input placeholder='name@example.com' type='email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button onClick={() => login(email)} disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <Button variant='outline' type='button'>
          GitHub
        </Button>
        <Button variant='outline' type='button'>
          Google
        </Button>
      </div>
    </div>
  )
}
