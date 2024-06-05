import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs/server'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Home() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }
  return (
    <div className="w-full">
      <div className="bg-cyan-700/80 h-[500px] relative z-0">
        <div className="absolute bottom-10 left-32 space-y-8">
          <h1 className="text-white text-5xl">
            Nossa Plataforma<span className="text-yellow-400">.</span>
          </h1>
          <p className="max-w-[500px] text-xl text-white">
            Plataforma de Avaliação para facilitar a percepção do profissional
            em sala de aula
          </p>
          <Button className="flex gap-2">
            CLIQUE PARA SABER MAIS{' '}
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </Button>
        </div>
        <Image
          src="/hero.png"
          width={1000}
          height={1000}
          alt="hero"
          className="right-0 pt-6 absolute"
        />
      </div>
    </div>
  )
}
