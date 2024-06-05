import { UserButton } from '@clerk/nextjs'
import { Logo } from './logo'
import { MobileSidebar } from './mobile-sidebar'
import { NavbarRoutes } from './navbar-routes'

const NavBar = () => {
  return (
    <div className="w-full">
      <div className="w-full py-4 border-b border-slate-900 hidden md:block bg-black">
        <div className="max-w-[1440px] px-8 flex justify-between">
          <Logo />
          <NavbarRoutes />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <MobileSidebar />
    </div>
  )
}

export default NavBar
