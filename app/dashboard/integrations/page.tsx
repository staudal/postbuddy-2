'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { supabase } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Tables } from '@/types/supabase'
import { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { useStore } from '@/store'

export default function IntegrationsPage() {
  const { user } = useStore()
  const [integrations, setIntegrations] = useState<Tables<'integrations'>[]>([])

  async function handleDeleteIntegration(id: string) {
    if (!user) {
      toast.error('You need to be logged in')
      return
    }
    const { error } = await supabase.from('integrations').delete().eq('id', id)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Integration removed')
    }
  }

  async function getIntegrations(user: User | null) {
    if (!user) {
      toast.error('You need to be logged in')
      return
    }
    const { data, error } = await supabase.from('integrations').select('*').eq('user_id', user.id)
    if (error) {
      toast.error(error.message)
    }
    if (data) {
      setIntegrations(data)
    }
  }

  useEffect(() => {
    if (user) {
      getIntegrations(user)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      redirect('/login')
    }
  }, [user])

  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Integrations</h1>
        <Link href='/api/shopify'>
          <Button>Add shopify account</Button>
        </Link>
      </div>
      <div>
        {integrations.map((integration: Tables<'integrations'>) => (
          <div key={integration.id} className='flex justify-between items-center p-4 rounded-md border'>
            <div>
              <h2 className='text-xl font-bold'>{integration.shop}</h2>
              <p className='text-muted-foreground'>
                Dato: {new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(integration.created_at))}
              </p>
            </div>
            <Button onClick={() => handleDeleteIntegration(integration.id)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
