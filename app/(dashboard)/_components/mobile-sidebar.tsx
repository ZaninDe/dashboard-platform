import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavbarRoutes } from './navbar-routes'
import { Logo } from './logo'

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition flex p-8 w-full justify-between border-b border-slate-900">
        <Logo />
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="px-0 py-10 bg-black">
        <NavbarRoutes />
      </SheetContent>
    </Sheet>
  )
}
