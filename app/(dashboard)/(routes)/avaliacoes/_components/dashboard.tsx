/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from '@prisma/client'
import { AssesmentUser } from './tabs-navigation'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

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
  dialogs: Dialog[]
}

const Dashboard = ({ assessment, dialogs }: DashBoardProps) => {
  const [progress, setProgress] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('0') // 0 = all

  const options = []

  for (let i = 0; i <= 4; i++) {
    options.push({ value: i.toString(), label: i.toString() })
  }

  useEffect(() => {
    const max =
      assessment.ratingScale === 'ELE'
        ? 64
        : assessment.ratingScale === 'SnapIV'
          ? 72
          : 72

    const assessmentScorePercentage = (assessment.resultAmount! / max) * 100
    setMaxScore(max)
    const timer = setTimeout(() => setProgress(assessmentScorePercentage), 500)
    return () => clearTimeout(timer)
  }, [assessment.ratingScale, assessment.resultAmount])

  const margin = `${Math.trunc(progress)}%`
  return (
    <div className="mb-10">
      <h1 className="text-2xl font-bold">Barra de Pontuação</h1>
      <p className="mb-10 text-muted-foreground">
        Aqui, temos que quanto menor a pontuação, significa que menor são as
        características dos comportamentos da escala aplicada.
      </p>
      <div className="relative">
        <p className={`absolute right-0 mt-[-24px] `}>{maxScore}</p>
        <p className={cn(`absolute mt-[-24px]`)} style={{ left: margin }}>
          {assessment.resultAmount} Pontos
        </p>
      </div>

      <Progress
        value={progress}
        className="h-10 rounded-none bg-green-600/40"
      />
      <div className="mt-16">
        <h1 className="text-2xl font-bold">Mapa de Cores</h1>
        <div>
          <p className="text-muted-foreground">
            Cada cor representa uma resposta, quanto mais vermelho, mais atenção
            deve ter em relação ao seu alerta, legenda:
          </p>
          <div className="">
            {assessment.ratingScale === 'ELE' &&
              ELEButtonOptions.map((option, index) => (
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
                      option.label === '1' && 'bg-red-50/50',
                      option.label === '2' && 'bg-red-100',
                      option.label === '3' && 'bg-red-300/60',
                      option.label === '4' && 'bg-red-400/90',
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
              {dialogs.map((dialog) => {
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
                    key={dialog?.id}
                    className={cn(
                      'border-1 w-18',
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
                        {answer?.label}
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
                  {dialogs.map((dialog) => {
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
                    }
                    return (
                      <div key={dialog?.id}>
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
      </div>
    </div>
  )
}

export default Dashboard
