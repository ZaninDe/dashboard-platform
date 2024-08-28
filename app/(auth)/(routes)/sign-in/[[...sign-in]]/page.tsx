import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="w-full h-full md:flex justify-between items-center md:px-32 p-4">
      <div className="">
        <div className="md:pl-10">
          <h1 className="text-white text-5xl">
            Nossa Plataforma<span className="text-yellow-400">.</span>
          </h1>
          <p className="max-w-[500px] text-xl text-white">
            Nossa Plataforma Utiliza Dashboards para o Mapeamento de
            Dificuldades de Aprendizagem Específicas
          </p>
        </div>
        <Image src="/login.png" width={700} height={700} alt="login" />
      </div>
      <SignIn />
    </div>
  )
}
