/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ELEButtonOptions, SNAPButtonOptions } from '@/const/rating-scales'
import { Dialog } from '@prisma/client'
import { AssesmentUser } from './tabs-navigation'
import { useUser } from '@clerk/clerk-react'
import { cn, formatDate, getItemsByIndexes } from '@/lib/utils'

interface AnswersProps {
  assessment: AssesmentUser
  dialogs: Dialog[]
}
const Answers = ({ assessment, dialogs }: AnswersProps) => {
  const { isSignedIn, user } = useUser()
  const createdDate = formatDate(assessment?.createdAt)
  const updatedDate = formatDate(assessment?.updatedAt)

  if (isSignedIn) {
    console.log(user)
  }

  return (
    <section className="min-h-screen space-y-4">
      <div className="flex justify-between items-center my-10">
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
      <div className="text-sm w-full grid grid-cols-3 my-8 text-white border border-neutral-900 rounded-md">
        <div className="bg-cyan-700 px-2 py-4 rounded-l-md flex flex-col justify-center">
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

        <div className="bg-cyan-700 px-2 py-4 rounded-r-md flex flex-col justify-center">
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

      {dialogs.map((dialog: Dialog, index: number) => {
        let answer: any
        if (assessment?.ratingScale === 'ELE') {
          answer = ELEButtonOptions.find(
            (option) => option.value === JSON.stringify(dialog.answer),
          )
        } else if (assessment?.ratingScale === 'SnapIV') {
          answer = SNAPButtonOptions.find(
            (option) => option.value === JSON.stringify(dialog.answer),
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
