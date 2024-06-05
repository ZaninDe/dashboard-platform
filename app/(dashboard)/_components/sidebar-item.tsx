'use client'
import { usePathname, useRouter } from 'next/navigation'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItemsProps {
  icon: LucideIcon
  label: string
  href: string
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemsProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const isActive =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)

  const onClick = () => {
    router.push(href)
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 text-white text-sm transition-all hover:text-slate-300',
        isActive && 'border-b-2 hover:text-slate-300',
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0  h-full transition-all',
          isActive && 'opacity-100',
        )}
      />
    </button>
  )
}
