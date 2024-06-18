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
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-2xl">
            A plataforma dá um diágnóstico?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-2xl">
            A plataforma é somente para profissionais da educação?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-2xl">
            A plataforma é paga?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-2xl">
            Tenho um limite para cadastro de alunos?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-2xl">
            Não lembro minha senha, como posso recuperá-la?
          </AccordionTrigger>
          <AccordionContent className="text-xl">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Faq
