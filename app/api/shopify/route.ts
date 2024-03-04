import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request, response: Response) {
  let client_id = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID
  let scopes = ['read_customers', 'write_discounts']
  let redirect_uri = 'http://localhost:3000/api/shopify/callback'
  let nonce = '123456'
  let url = `https://shopify.com/admin/oauth/authorize?client_id=${client_id}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}`

  return NextResponse.redirect(url)
}
