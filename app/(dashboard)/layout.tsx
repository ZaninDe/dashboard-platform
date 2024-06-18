'use client'

import { usePathname } from 'next/navigation'
import NavBar from './_components/navbar'
import Footer from '@/components/footer'
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const isHomePage = pathname === '/'
  return (
    <main className="">
      <NavBar absolute={isHomePage} />
      {children}
      <Footer />
    </main>
  )
}

export default DashboardLayout
