'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AssessmentWithDetails } from './student-dashboard'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { ArrowUp } from 'lucide-react'

interface ATADashboardProps {
  assessment: AssessmentWithDetails
}

const ATADashboard = ({ assessment }: ATADashboardProps) => {
  const [progress, setProgress] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

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

  return (
    <Card className="border border-slate-300 rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-center">
          Escala de Avaliação ATA (Transtornos Austísticos)
        </CardTitle>
        <CardContent>
          <div className="mt-10">
            <div className="relative">
              <p className={`absolute right-0 mt-2`}>de {maxScore}</p>
              <p className={cn(`absolute mt-[-24px]`)} style={{ left: margin }}>
                {Math.trunc((progress * maxScore) / 100)} Pontos
              </p>
              <div
                className={cn(
                  `absolute mt-2 flex flex-col justify-center items-center`,
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
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default ATADashboard
