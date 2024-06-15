import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavbarRoutes } from './navbar-routes'
import { Logo } from './logo'

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition flex p-8 w-full justify-between items-center bg-cyan-700/80">
        <Logo />
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent side="left" className="px-0 py-10 bg-black">
        <NavbarRoutes />
      </SheetContent>
    </Sheet>
  )
}
