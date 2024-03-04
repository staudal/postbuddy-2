'use client'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from '@/components/user-auth-form'
import mailbox from '@/assets/mailbox.jpg'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useStore } from '@/store'

export default function LoginPage() {
  const { user } = useStore()

  useEffect(() => {
    if (user) {
      redirect('/dashboard/campaigns')
    }
  }, [])

  return (
    <>
      <div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <Link href='/signup' className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}>
          Sign up
        </Link>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
          <div className='absolute inset-0'>
            <Image src={mailbox} alt='Mailbox' priority style={{ objectFit: 'cover' }} sizes='800px' fill />
          </div>
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            Postbuddy
          </div>
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;This mailing service has revolutionized our communication process, delivering reliability and efficiency that exceeds our
                expectations.&rdquo;
              </p>
              <footer className='text-sm'>Resights</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Log in to your account</h1>
              <p className='text-sm text-muted-foreground'>Enter your email and password to continue</p>
            </div>
            <UserAuthForm page='login' />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              Don&apos;t have an account yet?{' '}
              <Link href='/signup' className='text-primary hover:underline'>
                Create one!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
