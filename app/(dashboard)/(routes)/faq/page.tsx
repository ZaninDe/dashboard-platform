'use client'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const Faq = () => {
  const { userId } = useAuth()
  if (!userId) {
    redirect('/')
  }
  return (
    <div className="w-full h-[80vh] flex justify-center items-center text-5xl px-32 mb-[100px]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl">
            Como a plataforma funciona?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            A plataforma visa facilitar a percepção do profissional em sala de
            aula com alunos que apresentam dificuldades específicas de
            aprendizagem, afim de mapear através de relatórios de apontamento
            utilizando painéis de visualização..
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-2xl">
            Para onde vão os dados?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Os dados dos alunos cadastrados, assim como o resultado das
            avaliações são salvos em nuvem em um banco de dados (MongoDB) onde
            você não corre o risco de perder tudo que já cadastrou.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-2xl">
            A plataforma dá um diágnóstico?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Não, a plataforma tem finalidade de mapear as características
            encontradas na literatura, tornando possível rastrear situações onde
            intervenções na forma de proporcionar a educação sejam de extrema
            importância.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-2xl">
            A plataforma é somente para profissionais especialistas da educação?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Não, a plataforma pode ser usada por qualquer profissional da
            educação que tenha contato contínuo com o aluno avaliado, onde
            entende a necessidade de descartar a presença de dificuldades
            específicas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-2xl">
            A plataforma é paga?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Não, a plataforma é totalmente gratuíta e incentiva seu uso
            principalmente no ensino público.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-2xl">
            Tenho um limite para cadastro de alunos?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Atualmente não, você pode realizar uma avaliação de cada escala por
            aluno, de quantos alunos precisar.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Faq
