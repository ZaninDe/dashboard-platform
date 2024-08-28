import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavbarRoutes } from './navbar-routes'
import { Logo } from './logo'
import { UserButton } from '@clerk/nextjs'

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition flex p-4 w-full justify-between items-center bg-cyan-700/80">
        <Logo />
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent side="left" className="px-4 py-10 bg-white">
        <NavbarRoutes />
        <div className="absolute bottom-2 right-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
