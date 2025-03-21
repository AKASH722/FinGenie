'use client'

import { usePathname } from 'next/navigation'
import { navItems } from '@/components/navigation/nav-items'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Logout from '@/components/navigation/logout'

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background lg:hidden">
      <div className="grid h-full grid-cols-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center px-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary',
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 mb-1',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              />
              <span>{item.title}</span>
            </Link>
          )
        })}
        <Logout />
      </div>
    </div>
  )
}
