'use client'

import {
  BookCheck,
  GraduationCap,
  Home,
  LayoutDashboard,
  MessageCircleQuestion,
} from 'lucide-react'
import { SidebarItem } from './sidebar-item'

export const routes = [
  {
    icon: Home,
    label: 'Home',
    href: '/',
  },
  {
    icon: BookCheck,
    label: 'Avaliações',
    href: '/avaliacoes',
  },
  {
    icon: LayoutDashboard,
    label: 'Dashboards',
    href: '/dashboards',
  },
  {
    icon: MessageCircleQuestion,
    label: 'Dúvidas',
    href: '/faq',
  },
]

export const NavbarRoutes = () => {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-auto md:gap-10">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
