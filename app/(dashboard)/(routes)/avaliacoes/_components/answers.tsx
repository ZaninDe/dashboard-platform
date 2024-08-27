/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { SNAPButtonOptions } from '@/const/rating-scales'
import { CriteriaAssessment, Dialog } from '@prisma/client'
import { AssesmentUser } from './tabs-navigation'
import { useUser } from '@clerk/clerk-react'
import { cn, formatDate, getItemsByIndexes } from '@/lib/utils'
import { criteriaOptions } from '@/const/diagnostic-criteria'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface AnswersProps {
  assessment: AssesmentUser
  dialogs: Dialog[]
  criteriaAssessment: CriteriaAssessment | null
  criteriaDialogs: Dialog[]
}
const Answers = ({
  assessment,
  dialogs,
  criteriaAssessment,
  criteriaDialogs,
}: AnswersProps) => {
  const [observation, setObservation] = useState(
    criteriaAssessment?.observation || '',
  )
  const { isSignedIn, user } = useUser()
  const createdDate = formatDate(assessment?.createdAt)
  const updatedDate = formatDate(assessment?.updatedAt)
  const router = useRouter()

  if (isSignedIn) {
    console.log(user)
  }

  const handleSave = async () => {
    try {
      await axios.put(`/api/criteria-assessments/${criteriaAssessment?.id}`, {
        observation,
      })
      toast.success('Observação atualizada com sucesso.')
      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error('Algo deu errado ao salvar observação')
    }
  }

  return (
    <section className="min-h-screen space-y-4">
      <div className="md:flex justify-between items-center my-10">
        <div>
          <div className="text-2xl">
            <p className="whitespace-nowrap">
              Escala {assessment?.ratingScale}
            </p>
          </div>
        </div>
        <div className="flex items-end gap-1">
          <h1 className="text-black text-2xl">Nossa Plataforma</h1>
          <div className="w-2 h-2 bg-yellow-400 mb-[6px] rounded-full"></div>
        </div>
      </div>
      <div className="text-sm w-full md:grid md:grid-cols-3 my-8 text-white border border-neutral-900 rounded-md">
        <div className="bg-cyan-700 px-2 py-4 md:rounded-l-md flex flex-col justify-center">
          {/* <strong className="uppercase text-md">Aluno</strong> */}
          <div className="flex items-center gap-2">
            <strong>Nome: </strong>
            <p className="capitalize">{assessment?.student?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>Registro: </strong>
            <p className="capitalize">{assessment?.student?.ra}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>Idade: </strong>
            <p className="capitalize">{assessment?.student?.age}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>Ano Escolar: </strong>
            <p className="capitalize">{assessment?.student?.classroom}</p>
          </div>
        </div>

        <div className="bg-cyan-700/80 px-2 py-4 flex flex-col justify-center">
          {isSignedIn && (
            <>
              <div className="">
                {/* <strong className="uppercase text-md">Avaliação</strong> */}
                <div className="flex items-center gap-2">
                  <strong>Responsável: </strong>
                  <p className="capitalize">{user?.fullName}</p>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <strong>E-mail: </strong>
                  <p className="lowercase">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Início: </strong>
                  <p className="capitalize">{createdDate}</p>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <strong>Última Alteração: </strong>
                  <p className="capitalize">{updatedDate}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-cyan-700 px-2 py-4 md:rounded-r-md flex flex-col justify-center">
          {/* <strong className="uppercase text-md">Escola</strong> */}
          <div className="flex items-center gap-2">
            <strong>Escola: </strong>
            <p className="capitalize">{assessment?.student?.school?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>Endereço: </strong>
            <p className="capitalize">{assessment?.student?.school?.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>Telefone Principal: </strong>
            <p className="capitalize">{assessment?.student?.school?.phone}</p>
          </div>
        </div>
      </div>

      <section id="escala" className="">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="mb-10 md:mb-20"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="md:text-2xl">
              QUESTIONÁRIO ESCALA DE AVALIAÇÃO
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {dialogs.map((dialog: Dialog, index: number) => {
                  let answer: any
                  if (assessment?.ratingScale === 'SnapIV') {
                    answer = SNAPButtonOptions.find(
                      (option) =>
                        option.value === JSON.stringify(dialog.answer),
                    )
                  }
                  return (
                    <div
                      key={dialog.id}
                      className={cn(
                        'bg-muted/50 text-neutral-900/80 p-2 rounded-md',
                        answer?.value === '1' && 'bg-red-50/50',
                        answer?.value === '2' && 'bg-red-100',
                        answer?.value === '3' && 'bg-red-300/60',
                        answer?.value === '4' && 'bg-red-400/90 text-white',
                      )}
                    >
                      <strong>
                        {index + 1}. {dialog?.question} :
                      </strong>
                      {assessment?.ratingScale !== 'ATA' ? (
                        <p className="font-light">{answer?.label}</p>
                      ) : (
                        <p>
                          {/* @ts-ignore */}
                          {getItemsByIndexes(dialog.answer, index).length === 0
                            ? 'Nada assinalado'
                            : // @ts-ignore
                              getItemsByIndexes(dialog.answer, index)}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section id="criterio">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-2"
          className="mb-10 md:mb-20"
        >
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:text-2xl">
              <h1 className="md:text-2xl">
                QUESTIONÁRIO CRITÉRIO DE DIAGNÓSTICO
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {criteriaDialogs &&
                  criteriaDialogs.map((dialog: Dialog, index: number) => {
                    const answer = criteriaOptions.find(
                      (option) =>
                        option.value === JSON.stringify(dialog.answer),
                    )

                    return (
                      <div
                        key={dialog.id}
                        className={cn(
                          'bg-muted/50 text-neutral-900/80 p-2 rounded-md',
                          answer?.value === '0' && 'bg-slate-100',
                          answer?.value === '1' && 'bg-red-100',
                        )}
                      >
                        <strong>
                          {index + 1}. {dialog?.question} :
                        </strong>
                        <p className="font-light">{answer?.label}</p>
                      </div>
                    )
                  })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Accordion type="single" collapsible defaultValue="item-3">
        <AccordionItem value="item-3">
          <AccordionTrigger className="uppercase md:text-2xl">
            Observações
          </AccordionTrigger>
          <AccordionContent>
            <form className="grid w-full gap-1.5 p-1" action={handleSave}>
              <Textarea
                id="message"
                onBlur={handleSave}
                onChange={(e) => setObservation(e.target.value)}
                value={observation}
              />
              <p className="text-sm text-muted-foreground">
                As observações ajudam profissionais compreender cada aluno de
                forma individual
              </p>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default Answers
