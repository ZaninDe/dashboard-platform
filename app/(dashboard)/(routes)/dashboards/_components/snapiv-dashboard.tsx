'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  AssessmentWithDetails,
  CriteriaAssessmentWithDetails,
} from './student-dashboard'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface SNAPDashboardProps {
  assessment: AssessmentWithDetails
  criteriaAssessment: CriteriaAssessmentWithDetails | undefined
}

const SNAPDashboard = ({
  assessment,
  criteriaAssessment,
}: SNAPDashboardProps) => {
  const [progress, setProgress] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  console.log('CRITERIA: ', assessment.dialog)

  const router = useRouter()

  useEffect(() => {
    const max = assessment.ratingScale === 'SnapIV' ? 72 : 72

    const assessmentScorePercentage = (assessment.resultAmount! / max) * 100
    setMaxScore(max)
    const timer = setTimeout(() => {
      setProgress(assessmentScorePercentage)
    }, 500)
    return () => clearTimeout(timer)
  }, [assessment.ratingScale, assessment.resultAmount])

  const margin = `${Math.trunc(progress)}%`

  const handleSeeAssessment = () => {
    router.push(`/avaliacoes/${assessment.id}`)
  }

  const isFinished = !!assessment.resultAmount

  return (
    <Card className="border border-slate-300 rounded-md relative">
      <CardHeader className="">
        <CardTitle className="text-lg font-medium text-center">
          Escala SNAPIV (TDAH)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 mb-20">
        {isFinished ? (
          <div>
            <div className="mt-10">
              <div className="relative">
                <p className={`absolute right-0 mt-4`}>de {maxScore}</p>
                <p
                  className={cn(`absolute mt-[-24px]`)}
                  style={{ left: margin }}
                >
                  {Math.trunc((progress * maxScore) / 100)} Pontos
                </p>
              </div>
              <Progress value={progress} className="bg-green-600/40" />
            </div>
            <div className="mt-16">
              <h1 className="text-2xl font-bold mb-4">
                Resultados para o critério A obtidos através da escala SNAP-IV
              </h1>
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
                  <strong>IMPORTANTE: </strong>O Critério A foi satisfeito,
                  porém Não se pode fazer o diagnóstico de TDAH apenas com
                  critério “A”. Veja abaixo os demais critérios que precisam ser
                  satisfeitos.
                </p>
                <p className="">
                  <strong>CRITÉRIO B:</strong>Alguns desses sintomas devem estar
                  presentes antes dos 7 anos de idade.
                </p>
                <p className="">
                  <strong>CRITÉRIO C: </strong>Existem problemas causados pelos
                  sintomas acima em pelo menos 2 contextos diferentes (por ex.,
                  na escola, no trabalho, na vida social e em casa).
                </p>
                <p className="">
                  <strong>CRITÉRIO D: </strong>Há problemas evidentes na vida
                  escolar, social ou familiar por conta dos sintomas.
                </p>
                <p className="">
                  <strong>CRITÉRIO E: </strong>Se existe um outro problema (tal
                  como depressão, deficiência mental, psicose, etc.), os
                  sintomas não podem ser atribuídos exclusivamente a ele.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-14">Avaliação não finalizada.</div>
        )}
        {criteriaAssessment && (
          <div className="mt-10">
            <h1 className="text-2xl font-bold mb-2">
              Características mapeadas para critério de diagnóstico:
            </h1>
            {criteriaAssessment.dialog.map((dialog) => (
              <div key={dialog.id} className="text-muted-foreground">
                {JSON.stringify(dialog.answer) === '1' && (
                  <p className="py-2 border-b border-slate-200">
                    item {dialog.questionNumber} -{' '}
                    {dialog.question.replace(/\?/g, '.')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end absolute bottom-0 right-0">
        <Button variant="link" onClick={handleSeeAssessment}>
          Ver Avaliação
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SNAPDashboard
