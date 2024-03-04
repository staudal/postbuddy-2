import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    }
  );

  // Refresh session if expired - required for Server Components
  const user = await supabase.auth.getUser();

  // Check if user is not logged in and trying to access dashboard
  if (!user.data.user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }

  // Check if user is logged in and trying to access login or signup
  if (user.data.user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(`${req.nextUrl.origin}/dashboard/campaigns`);
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
