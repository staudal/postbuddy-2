'use client'

import { useStore } from '@/store'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Index() {
  const { user } = useStore()

  useEffect(() => {
    if (user) {
      redirect('/dashboard/campaigns')
    }
  }, [user])

  return (
    <div className='container py-6'>
      <p>The landing page is under development.</p>
      <p className='text-primary hover:underline'>
        <Link href='/login'>Log in to your account</Link>
      </p>
    </div>
  )
}
