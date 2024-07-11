/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  ATAQuestions,
  ELEButtonOptions,
  SNAPButtonOptions,
} from '@/const/rating-scales'
import { Dialog } from '@prisma/client'
import { AssesmentUser } from './tabs-navigation'

interface AnswersProps {
  assessment: AssesmentUser
  dialogs: Dialog[]
}
const Answers = ({ assessment, dialogs }: AnswersProps) => {
  const getItemsByIndexes = (indexes: any[], step: number): string[] => {
    const question = ATAQuestions.find((q) => q.step === step)
    if (!question) {
      return []
    }

    return indexes.map((index) => {
      const option = question.options.find((opt) => opt.index === index)
      return option ? `${option.item}, ` : 'Índice não encontrado'
    })
  }
  return (
    <section className="min-h-screen py-4 space-y-4">
      <div className="w-full grid grid-cols-3 my-8 uppercase text-white border border-neutral-900 rounded-md">
        <div className="bg-cyan-700/60 p-4 rounded-l-md">
          <div className="flex items-center gap-2">
            <strong>aluno: </strong>
            <p>{assessment?.student?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>registro do aluno: </strong>
            <p>{assessment?.student?.ra}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>idade: </strong>
            <p>{assessment?.student?.age}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>Ano Escolar: </strong>
            <p>{assessment?.student?.classroom}</p>
          </div>
        </div>

        <div className="bg-cyan-700/80 p-4">
          <div className="flex items-center gap-2">
            <strong>Escola: </strong>
            <p>{assessment?.student?.school?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>Endereço: </strong>
            <p>{assessment?.student?.school?.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <strong>Telefone Principal: </strong>
            <p>{assessment?.student?.school?.phone}</p>
          </div>
        </div>

        <div className="bg-cyan-700 p-4 rounded-r-md">
          <div className="">
            <div className="flex items-center gap-2">
              <strong>Telefone Principal: </strong>
              <p>{assessment?.student?.school?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {dialogs.map((dialog: Dialog, index: number) => {
        let answer: string | undefined = ''
        if (assessment?.ratingScale === 'ELE') {
          answer = ELEButtonOptions.find(
            (option) => option.value === JSON.stringify(dialog.answer),
          )?.label
        } else if (assessment?.ratingScale === 'SnapIV') {
          answer = SNAPButtonOptions.find(
            (option) => option.value === JSON.stringify(dialog.answer),
          )?.label
        }
        return (
          <div key={dialog.id} className="">
            <strong>
              {index + 1}. {dialog?.question} :
            </strong>
            {assessment?.ratingScale !== 'ATA' ? (
              <p className="font-light">{answer}</p>
            ) : (
              // @ts-ignore
              <>{<p>{getItemsByIndexes(dialog.answer, index)}</p>}</>
            )}
          </div>
        )
      })}
    </section>
  )
}

export default Answers
