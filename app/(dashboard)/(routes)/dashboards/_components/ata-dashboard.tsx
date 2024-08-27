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
import { ArrowUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface ATADashboardProps {
  assessment: AssessmentWithDetails
  criteriaAssessment: CriteriaAssessmentWithDetails | undefined
}

const ATADashboard = ({
  assessment,
  criteriaAssessment,
}: ATADashboardProps) => {
  const [progress, setProgress] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const max = 46

    const assessmentScorePercentage = (assessment.resultAmount! / max) * 100
    setMaxScore(max)
    const timer = setTimeout(() => {
      setProgress(assessmentScorePercentage)
    }, 500)
    return () => clearTimeout(timer)
  }, [assessment.ratingScale, assessment.resultAmount])

  const margin = `${Math.trunc(progress)}%`
  const maxPercentage = `${Math.trunc((15 / 46) * 100)}%`

  const handleSeeAssessment = () => {
    router.push(`/avaliacoes/${assessment.id}`)
  }

  const isFinished = !!assessment.resultAmount

  return (
    <Card className="border border-slate-300 rounded-md relative">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-center">
          Escala de Avaliação ATA (Transtornos Austísticos)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isFinished ? (
          <div className="p-4 md:p-6 mb-20">
            <div className="mt-10">
              <div className="relative">
                <p className={`absolute right-0 mt-4`}>de {maxScore}</p>
                <p
                  className={cn(`absolute mt-[-24px] whitespace-nowrap`)}
                  style={{ left: margin }}
                >
                  {Math.trunc((progress * maxScore) / 100)} Pontos
                </p>
                <div
                  className={cn(
                    `absolute mt-4 flex flex-col justify-center items-center`,
                  )}
                  style={{ left: maxPercentage }}
                >
                  <ArrowUp />
                  <p className="absolute mt-10 whitespace-nowrap">
                    Corte 15 pontos
                  </p>
                </div>
              </div>
              <Progress value={progress} className="bg-green-600/40" />
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

export default ATADashboard
