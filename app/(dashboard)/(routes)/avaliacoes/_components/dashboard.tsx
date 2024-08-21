/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assessment, Dialog } from '@prisma/client'
import { AssesmentUser } from './tabs-navigation'
import { Progress } from '@/components/ui/progress'
import { cn, countNumbersAndNulls, getItemsByIndexes } from '@/lib/utils'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Card, CardContent } from '@/components/ui/card'

import { ELEButtonOptions, SNAPButtonOptions } from '@/const/rating-scales'
import { useEffect, useState } from 'react'

interface DashBoardProps {
  assessment: AssesmentUser
  assessments: Assessment[]
  dialogs: Dialog[]
}

const Dashboard = ({ assessment, assessments, dialogs }: DashBoardProps) => {
  const [progress, setProgress] = useState(0)
  const [meanProgress, setMeanProgress] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('0') // 0 = all

  const isAtaRatingScale = assessment.ratingScale === 'ATA'

  const options = []

  const totalOptions = isAtaRatingScale ? 3 : 4
  for (let i = 0; i <= totalOptions; i++) {
    options.push({ value: i.toString(), label: i.toString() })
  }

  useEffect(() => {
    const max =
      assessment.ratingScale === 'ELE'
        ? 64
        : assessment.ratingScale === 'SnapIV'
          ? 72
          : 46

    const meanValues = assessments.map((assessment) => assessment.resultAmount)

    const mean =
      assessment.ratingScale === 'ATA' ? 15 : countNumbersAndNulls(meanValues)

    const assessmentScorePercentage = (assessment.resultAmount! / max) * 100
    setMaxScore(max)
    const timer = setTimeout(() => {
      setProgress(assessmentScorePercentage)
      setMeanProgress(mean)
    }, 500)
    return () => clearTimeout(timer)
  }, [assessment.ratingScale, assessment.resultAmount, assessments])

  const margin = `${Math.trunc(progress)}%`
  const meanMargin = `${(meanProgress / maxScore) * 100}%`
  return (
    <div className="mb-10">
      <h1 className="text-2xl font-bold">Barra de Pontuação</h1>
      <p className="mb-10 text-muted-foreground">
        Aqui, temos que quanto menor a pontuação, significa que menor são as
        características dos comportamentos da escala aplicada.
      </p>
      <div className="relative">
        <p className={`absolute right-0 `}>{maxScore}</p>
        <p className={cn(`absolute`)} style={{ left: margin }}>
          {assessment.resultAmount} Pontos
        </p>
      </div>

      <div>
        <p>Pontuação do Aluno</p>
        <Progress
          value={progress}
          className="h-10 rounded-none bg-green-600/40"
        />
      </div>

      <div className="mt-10">
        <p>
          {assessment.ratingScale === 'ATA'
            ? 'Corte'
            : 'Pontuação Média de Todos Alunos'}
        </p>
        <div className="relative">
          <p className={`absolute right-0 mt-[-24px] `}>{maxScore}</p>
          <p className={cn(`absolute mt-[-24px]`)} style={{ left: meanMargin }}>
            {meanProgress} Pontos
          </p>
        </div>
        <Progress
          value={(meanProgress / maxScore) * 100}
          className="bg-green-600/40"
        />
      </div>
      <div className="mt-16">
        <h1 className="text-2xl font-bold">Mapa de Cores</h1>
        <div>
          <p className="text-muted-foreground">
            Cada cor representa uma resposta, quanto mais vermelho, mais atenção
            deve ter em relação ao seu alerta, legenda:
          </p>
          <div className="">
            {isAtaRatingScale
              ? options.map((option, index) => (
                  <div key={option.value}>
                    {index > 0 && (
                      <div className="flex gap-2 items-center space-y-2">
                        <div
                          className={cn(
                            'h-8 w-12 mt-2',
                            index === 0 && 'bg-red-50 text-white',
                            index === 1 && 'bg-red-100 text-white',
                            index === 2 && 'bg-red-300 text-white',
                            index === 3 && 'bg-red-400 text-white',
                          )}
                        ></div>
                        <p>
                          {index === 1
                            ? 'Nenhum comportamento identificado na sub escala'
                            : index === 2
                              ? '1 comportamento identificado'
                              : '2 ou mais comportamentos identificados'}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              : ELEButtonOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className="flex gap-2 items-center space-y-2"
                  >
                    <div
                      className={cn(
                        'h-8 w-12 mt-2',
                        index === 0 && 'bg-red-50 text-white',
                        index === 1 && 'bg-red-100 text-white',
                        index === 2 && 'bg-red-300 text-white',
                        index === 3 && 'bg-red-400 text-white',
                      )}
                    ></div>
                    <p>{option.label}</p>
                  </div>
                ))}
          </div>
        </div>
        <div className="grid grid-cols-3 justify-start mt-8">
          <div>
            <Select onValueChange={setSelectedCategory}>
              <SelectTrigger
                className={cn(
                  'mt-1 w-full md:w-[320px]',
                  selectedCategory === '0' && 'bg-slate-200',
                  selectedCategory === '1' && 'bg-red-50  text-white',
                  selectedCategory === '2' && 'bg-red-100  text-white',
                  selectedCategory === '3' && 'bg-red-300  text-white',
                  selectedCategory === '4' && 'bg-red-400 text-white',
                )}
              >
                <SelectValue placeholder="SELECIONE UMA COR" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className={cn(
                      'mt-1',
                      option.label === '0' && 'bg-slate-200',
                      !isAtaRatingScale &&
                        option.label === '1' &&
                        'bg-red-50/50',
                      !isAtaRatingScale && option.label === '2' && 'bg-red-100',
                      !isAtaRatingScale &&
                        option.label === '3' &&
                        'bg-red-300/60',
                      !isAtaRatingScale &&
                        option.label === '4' &&
                        'bg-red-400/90',

                      isAtaRatingScale &&
                        option.label === '1' &&
                        'bg-green-200',
                      isAtaRatingScale && option.label === '2' && 'bg-red-200',
                      isAtaRatingScale && option.label === '3' && 'bg-red-400',
                    )}
                  >
                    <div className="h-4">{option.value === '0' && 'TODAS'}</div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div
              className={cn(
                'grid grid-cols-4 grid-rows-4 mt-10 border justify-center items-center gap-1 w-[320px]',
                assessment?.ratingScale === 'SnapIV' && 'grid-cols-5',
              )}
            >
              {dialogs.map((dialog, index) => {
                let answer: any
                if (assessment?.ratingScale === 'ELE') {
                  answer = ELEButtonOptions.find(
                    (option) => option.value === JSON.stringify(dialog.answer),
                  )
                } else if (assessment?.ratingScale === 'SnapIV') {
                  answer = SNAPButtonOptions.find(
                    (option) => option.value === JSON.stringify(dialog.answer),
                  )
                } else if (assessment?.ratingScale === 'ATA') {
                  // @ts-ignore
                  answer = getItemsByIndexes(dialog.answer, index)
                }

                return (
                  <div
                    key={dialog?.id}
                    className={cn(
                      'border-1 w-18 bg-red-500',
                      isAtaRatingScale &&
                        answer.length === 0 &&
                        (selectedCategory === '0' || selectedCategory === '1'
                          ? 'bg-green-200'
                          : 'bg-transparent'),
                      isAtaRatingScale &&
                        answer.length === 1 &&
                        (selectedCategory === '0' || selectedCategory === '2'
                          ? 'bg-red-200'
                          : 'bg-transparent'),
                      isAtaRatingScale &&
                        answer.length >= 2 &&
                        (selectedCategory === '0' || selectedCategory === '3'
                          ? 'bg-red-400'
                          : 'bg-transparent'),
                      dialog.answer === 1 &&
                        (selectedCategory === '0' || selectedCategory === '1'
                          ? 'bg-red-50'
                          : 'bg-transparent'),
                      dialog.answer === 2 &&
                        (selectedCategory === '0' || selectedCategory === '2'
                          ? 'bg-red-100'
                          : 'bg-transparent'),
                      dialog.answer === 3 &&
                        (selectedCategory === '0' || selectedCategory === '3'
                          ? 'bg-red-300'
                          : 'bg-transparent'),
                      dialog.answer === 4 &&
                        (selectedCategory === '0' || selectedCategory === '4'
                          ? 'bg-red-400'
                          : 'bg-transparent'),
                    )}
                  >
                    <HoverCard>
                      <HoverCardTrigger className="text-transparent">
                        <p>.</p>
                        <p>.</p>
                        <p>.</p>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-96">
                        <p>
                          <strong>Pergunta: </strong>
                          {dialog.question}
                        </p>

                        <strong className="mt-8">Resposta: </strong>
                        {isAtaRatingScale
                          ? answer.length === 0
                            ? 'Nada assinalado'
                            : answer
                          : answer?.label}
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )
              })}
            </div>
            <p className="text-muted-foreground mb-12 max-w-[320px] mt-4 text-sm">
              Você também pode passar o mouse por cima de cada quadrado, para
              visualizar a questão individualmente.
            </p>
          </div>
          <Card className="w-full h-full col-span-2 py-4">
            <CardContent className="h-full w-full">
              {selectedCategory === '0' ? (
                <div className="w-full h-full flex justify-center items-center">
                  <p>Selecione uma cor para visualizar as respostas</p>
                </div>
              ) : (
                <div>
                  {dialogs.map((dialog, index) => {
                    let answer: any
                    if (assessment?.ratingScale === 'ELE') {
                      answer = ELEButtonOptions.find(
                        (option) =>
                          option.value === JSON.stringify(dialog.answer),
                      )
                    } else if (assessment?.ratingScale === 'SnapIV') {
                      answer = SNAPButtonOptions.find(
                        (option) =>
                          option.value === JSON.stringify(dialog.answer),
                      )
                    } else if (assessment?.ratingScale === 'ATA') {
                      // @ts-ignore
                      answer = getItemsByIndexes(dialog.answer, index)
                    }

                    const ataOption = (
                      answer.length === 0 ? 1 : answer.length === 1 ? 2 : 3
                    ).toString()
                    return (
                      <div key={dialog?.id}>
                        {ataOption === selectedCategory && (
                          <div className="mb-4 bg-slate-100 p-2 rounded-xl">
                            <p>
                              <strong>Pergunta: </strong>
                              {dialog.question}
                            </p>

                            <p>
                              <strong className="mt-8">Resposta: </strong>
                              {answer}
                            </p>
                          </div>
                        )}
                        {answer?.value === selectedCategory && (
                          <div className="mb-4 bg-slate-100 p-2 rounded-xl">
                            <p>
                              <strong>Pergunta: </strong>
                              {dialog.question}
                            </p>

                            <p>
                              <strong className="mt-8">Resposta: </strong>
                              {answer?.label}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {assessment.ratingScale === 'SnapIV' && (
          <div className="mt-16">
            <p>
              <strong>Indicativo de desatenção: </strong>
              {assessment?.inattention ? 'Sim' : 'Não'}
            </p>
            <p>
              <strong>Indicativo de hiperatividade: </strong>
              {assessment?.hyperactivity ? 'Sim' : 'Não'}
            </p>
            <div className="space-y-2">
              <p className="my-10">
                <strong>IMPORTANTE: </strong> Não se pode fazer o diagnóstico de
                TDAH apenas com critério “A”. Veja abaixo os demais critérios.
              </p>
              <p className="">
                <strong>CRITÉRIO B:</strong>Alguns desses sintomas devem estar
                presentes antes dos 7 anos de idade.
              </p>
              <p className="">
                <strong>CRITÉRIO C: </strong>Existem problemas causados pelos
                sintomas acima em pelo menos 2 contextos diferentes (por ex., na
                escola, no trabalho, na vida social e em casa).
              </p>
              <p className="">
                <strong>CRITÉRIO D: </strong>Há problemas evidentes na vida
                escolar, social ou familiar por conta dos sintomas.
              </p>
              <p className="">
                <strong>CRITÉRIO E: </strong>Se existe um outro problema (tal
                como depressão, deficiência mental, psicose, etc.), os sintomas
                não podem ser atribuídos exclusivamente a ele.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
