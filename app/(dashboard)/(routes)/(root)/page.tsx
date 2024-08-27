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
      <div className="bg-cyan-700/80 h-[400px] md:h-[500px] relative z-0 p-4">
        <div className="md:absolute bottom-10 left-32 space-y-8">
          <h1 className="text-white text-5xl">
            Nossa Plataforma<span className="text-yellow-400">.</span>
          </h1>
          <p className="max-w-[500px] text-xl text-white">
            Nossa Plataforma Utiliza Dashboards para o Mapeamento de
            Dificuldades de Aprendizagem Específicas
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
      <section id="about" className="md:px-52 p-4 pt-48 md:pt-80 space-y-20">
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
        <Link
          to="dsm"
          spy={true}
          smooth={true}
          offset={100}
          duration={700}
          className="cursor-pointer mx-auto flex justify-center"
        >
          <Button className="flex gap-2">
            CLIQUE PARA SABER MAIS
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </Button>
        </Link>
      </section>
      <section id="dsm" className="md:p-52 mt-24 bg-cyan-700/70 pb-[200px] p-4">
        <div className="md:flex justify-center items-center gap-12">
          <Image src="/students.png" alt="students" width={460} height={365} />
          <h1 className="md:max-w-[50%] md:text-2xl text-white mt-4 md:mt-0">
            Nossa Plataforma<span className="text-yellow-400">.</span> utiliza
            escalas de avaliação baseadas na DSM-V, Manual Diagnóstico e
            Estatístico de Transtornos Mentais, é uma publicação da Associação
            Americana de Psiquiatria (APA) que fornece uma classificação
            padronizada de transtornos mentais.
          </h1>
        </div>

        <div className="md:flex justify-end items-center gap-12 mt-10 md:mt-40 relative">
          <h1 className="md:max-w-[80%] md:text-2xl p-4 md:p-0 text-white bg-black/80 md:pl-10 md:pr-72 md:py-32 relative z-0 md:right-60 rounded-lg">
            Esquematizamos o sistema de pontuação com base em cada escala de
            avaliação para garantir maior precisão nos mapeamentos
          </h1>
          <Image
            src="/compute.png"
            alt="students"
            width={460}
            height={365}
            className="absolute z-10 mt-6 md:mt-0"
          />
        </div>

        <div className="flex flex-col-reverse md:flex-col justify-center items-center gap-12 mt-80 md:mt-40 ">
          <Image
            src="/dashboards.png"
            alt="students"
            width={460}
            height={365}
          />
          <h1 className="md:max-w-[50%] md:text-2xl text-white">
            Exibimos o resultado através de um mapeamento com o auxilio de
            dashboards interativos de fácil compreensão visual para o
            profissional da educação, utilizando tecnologias de programação web.
          </h1>
        </div>
      </section>
    </div>
  )
}
