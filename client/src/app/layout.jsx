import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import AuthProvider from '@/providers/auth-provider'
import { TanStackProvider } from '@/providers/tanstack-provider'

const satoshi = localFont({
  src: './fonts/Satoshi-Variable.ttf',
  variable: '--font-satoshi',
  weight: '100 900 500 300 400 200 600 700 800',
})

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin'],
})

export const metadata = {
  title: 'FinGenie',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={`${satoshi.variable} ${poppins.variable} antialiased min-h-dvh`}
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
    >
      <AuthProvider>
        <TanStackProvider>
          {children}
          <Toaster richColors position="top-right" />
        </TanStackProvider>
      </AuthProvider>
    </ThemeProvider>
    </body>
    </html>
  )
}