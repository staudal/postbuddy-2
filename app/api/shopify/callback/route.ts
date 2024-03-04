import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // get variables needed to send post request to shopify
  let client_id = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  let shop = requestUrl.searchParams.get('shop')
  if (shop) {
    shop = shop.replace('.myshopify.com', '')
  }
  const url = `https://${shop}.myshopify.com/admin/oauth/access_token`

  // send post request to shopify to get access token
  const body = {
    client_id,
    client_secret: 'f3aaf0f93a7b5e2859a49f23b74998b4',
    code: code
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const res = await response.json()

  // insert shopify integration to database

  // redirect to integrations dashboard page
  return NextResponse.redirect('http://localhost:3000/dashboard/integrations')
}
