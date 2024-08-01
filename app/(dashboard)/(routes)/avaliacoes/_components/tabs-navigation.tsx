'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Assessment, Dialog, School, Student } from '@prisma/client'
import Answers from './answers'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import html2pdf from 'html2pdf.js'
import { File } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export interface StudentSchool extends Student {
  school: School
}

export interface AssesmentUser extends Assessment {
  student: StudentSchool
}

interface TabsNavigationProps {
  assessment: AssesmentUser
  dialogs: Dialog[]
}

export function TabsNavigation({ assessment, dialogs }: TabsNavigationProps) {
  const [progress, setProgress] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  React.useEffect(() => {
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
  }, [])

  const numberOfQuestions =
    assessment.ratingScale === 'ELE'
      ? 16
      : assessment.ratingScale === 'SnapIV'
        ? 18
        : 18
  const margin = `${Math.trunc(progress)}%`
  const router = useRouter()
  const reportRef = useRef<HTMLDivElement>(null)

  const generatePDF = () => {
    if (reportRef.current) {
      html2pdf()
        .from(reportRef.current)
        .save(`${assessment?.student?.name}_${assessment?.student?.ra}.pdf`)
    }
  }
  return (
    <Tabs defaultValue="dashboard" className="w-full mt-10">
      <TabsList className="grid grid-cols-2 w-[400px] mx-auto">
        <TabsTrigger value="answers">Espelho</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
      </TabsList>
      <TabsContent value="answers">
        <Card>
          <CardHeader className="">
            <CardTitle>Espelho de Avaliação</CardTitle>
            <div className="flex w-full items-center justify-between">
              <CardDescription>
                Aqui são apresentadas as respostas durante o preenchimento da
                avaliação
              </CardDescription>
              <Button
                onClick={generatePDF}
                className="flex items-center justify-center gap-2"
              >
                Exportar Relatório
                <File />
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-2" ref={reportRef}>
            <Answers dialogs={dialogs} assessment={assessment} />
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.back()}>Voltar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="dashboard">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Explore os filtros para gerar gráficos personalizados em suas
              análises.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1>Pontuação</h1>
            <p className="mb-12">
              Aqui, temos que quanto menor a pontuação, significa que menor são
              as características dos comportamentos da escala aplicada.
            </p>
            <div className="relative">
              <p className={`absolute right-0 mt-[-24px] `}>{maxScore}</p>
              <p className={`absolute left-[${margin}] mt-[-24px]`}>
                {assessment.resultAmount} Pontos
              </p>
            </div>

            <Progress
              value={progress}
              className="h-10 rounded-none bg-green-600/40"
            />
            <div className="grid grid-cols-4 grid-rows-4 mt-10 border justify-center items-center gap-1 w-[200px]">
              {dialogs.map((dialog) => {
                return (
                  <div
                    key={dialog?.id}
                    className={cn(
                      'w-12 h-12  border-1',
                      dialog.answer === 1 && 'bg-green-600',
                      dialog.answer === 2 && 'bg-green-300',
                      dialog.answer === 3 && 'bg-orange-400',
                      dialog.answer === 4 && 'bg-red-600',
                    )}
                  ></div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.back()}>Voltar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
