import { ThemeToggle } from '@/components/theme-toggle'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPageLayout({ children }) {
  return (
    <section className="min-h-dvh bg-background font-poppins">
      <header
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <span className="font-satoshi font-bold text-xl">FinGenie</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>

            <Link href="/signin" className="hidden md:block">
              <Button variant="secondary">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="py-12 bg-card border-t border-border/40">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm text-muted-foreground">© 2025 FinGenie. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
