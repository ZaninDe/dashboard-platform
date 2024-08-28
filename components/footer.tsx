'use client'

import { Logo } from '@/app/(dashboard)/_components/logo'
import { routes } from '@/app/(dashboard)/_components/navbar-routes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const router = useRouter()

  return (
    <section className="w-full md:px-32 py-10 bg-cyan-700/80 flex flex-col-reverse md:grid grid-cols-3 text-white">
      <div className="p-4 md:p-0 space-y-2 md:space-y-0">
        <Logo />
        <div className="md:mt-20">
          <p> © 2022- Nossa Plataforma</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center mt-10 md:mt-0 gap-4 md:gap-0">
        {routes.map((item) => (
          <div
            key={item.href}
            onClick={() => router.push(item.href)}
            className="cursor-pointer"
          >
            {item.label}
          </div>
        ))}
      </div>
      <Image
        src="/footer_image.png"
        alt="footer image"
        width={800}
        height={569}
        className="mt-[-120px]"
      />
    </section>
  )
}

export default Footer
