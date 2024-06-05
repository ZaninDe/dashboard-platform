'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Link } from 'react-scroll'

export default function Home() {
  const { userId } = useAuth()

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
            Plataforma auxiliadora na percepção de características de
            dificuldades específicas de aprendizado pelo profissional em sala de
            aula
          </p>
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={100}
            duration={700}
            className="cursor-pointer mt-10 block"
          >
            <Button className="flex gap-2">
              CLIQUE PARA SABER MAIS
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </Button>
          </Link>
        </div>
        <Image
          src="/hero.png"
          width={1000}
          height={1000}
          alt="hero"
          className="right-0 pt-6 absolute"
        />
      </div>
      <section id="about" className="px-52 pb-52 pt-80 space-y-40">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Avaliação</h2>
          <p>
            A Nossa Plataforma foi criada para facilitar a percepção do
            profissional em sala de aula com alunos que apresentam dificuldades
            específicas de aprendizagem, afim de mapear através de relatórios de
            apontamento utilizando painéis de visualização.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            Uma plataforma a serviço da aprendizagem
          </h2>
          <p>
            A plataforma oferece um conjunto de recursos e ferramentas que dão
            suporte à Secretaria, às regionais, às escolas e aos estudantes,
            desde a aplicação dos testes até a devolutiva dos resultados. Os
            profissionais podem consultar informações sobre o desenvolvimento de
            habilidades essenciais, bem como acerca de situações de defasagens
            identificadas. Com base em evidências, podem realizar um
            (re)planejamento pedagógico que considere a priorização curricular
            ou a implementação de projetos, focando em intervenções.
          </p>
        </div>
      </section>
    </div>
  )
}
