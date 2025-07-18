import type { Metadata } from 'next'
import './globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
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
