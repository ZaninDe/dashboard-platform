import { UserButton } from '@clerk/nextjs'
import { Logo } from './logo'
import { MobileSidebar } from './mobile-sidebar'
import { NavbarRoutes } from './navbar-routes'
import { cn } from '@/lib/utils'

interface NavbarProps {
  absolute?: boolean
}

const NavBar = ({ absolute }: NavbarProps) => {
  return (
    <div>
      <div
        className={cn(
          'w-full bg-cyan-700/80 hidden md:block',
          absolute && 'absolute z-50 bg-transparent',
        )}
      >
        <div className="w-full py-4 border-b border-white ">
          <div className="max-w-[1440px] px-32 flex justify-between mx-auto">
            <Logo />
            <NavbarRoutes />
            <div className="border w-8 h-8 flex justify-center items-center rounded-full my-auto">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </div>
      <MobileSidebar />
    </div>
  )
}

export default NavBar
