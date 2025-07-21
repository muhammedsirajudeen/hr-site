import type { Metadata } from 'next'
import './globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'onboard tribe',
  description: 'Hiring site that goes against the norms',
  generator: 'vercel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster /> {/* ✅ Sonner Toaster */}

        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!} >
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
