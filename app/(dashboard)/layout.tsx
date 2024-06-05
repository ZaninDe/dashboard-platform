'use client'

import { usePathname } from 'next/navigation'
import NavBar from './_components/navbar'
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const isHomePage = pathname === '/'
  return (
    <main className="">
      <NavBar absolute={isHomePage} />
      {children}
    </main>
  )
}

export default DashboardLayout
