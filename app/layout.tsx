"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "sonner";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils";
import LoadingSpinner from "@/components/loading-spinner";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser } = useStore();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  async function fetchSession() {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    } else if (data.session) {
      setUser(data.session.user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="bg-background text-foreground h-full">
        {loading && <LoadingSpinner />}
        {user ? (
          <>
            <Navbar user={user} />
            <main className="lg:pl-72">
              <div className="container py-6">{children}</div>
            </main>
          </>
        ) : (
          <>{children}</>
        )}
        <Toaster position="bottom-right" />
        <SpeedInsights />
      </body>
    </html>
  );
}
