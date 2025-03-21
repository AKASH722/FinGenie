'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/navigation/nav-items'
import Logout from '@/components/navigation/logout'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col justify-between py-4">
      <div className="px-3 py-2">
        <div className="mb-10 flex items-center justify-between px-3">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="logo" height={32} width={32} />
            <span className="text-xl text-primary font-bold">
              FinGenie
            </span>
          </Link>

            <ThemeToggle />
        </div>
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href
            return (
              <Button
                key={item.href}
                asChild
                className={cn('w-full justify-start')}
                variant={isActive ? 'default' : 'secondary'}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium"
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
      <div className="px-3">
        <Logout />
      </div>
    </div>
  )
}
