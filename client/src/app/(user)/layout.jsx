import { SideNav } from '@/components/navigation/side-nav'
import BottomNav from '@/components/navigation/bottom-nav'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Layout({ children }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <header className="sticky flex items-center justify-between w-full top-0 z-40 border-b bg-background lg:hidden">
        <div className="flex px-3 py-2 items-center space-x-2">
          <Image src="/logo.png" alt="logo" height={32} width={32} />
          <span className="text-xl text-primary font-bold">
              FinGenie
            </span>
        </div>
        <div className="px-3 py-2 ">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-60 border-r bg-muted/40 lg:block sticky left-0 top-0 h-screen">
          <SideNav />
        </aside>
        <main className="flex-1 p-4 pb-20 md:p-6 lg:pb-6">
          <div className="mx-auto space-y-6">{children}</div>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
