'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AssessmentWithDetails } from './student-dashboard'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { ArrowUp } from 'lucide-react'

interface ELEDashboard {
  assessment: AssessmentWithDetails
}

const ELEDashboard = ({ assessment }: ELEDashboard) => {
  const [progress, setProgress] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  useEffect(() => {
    const max =
      assessment.ratingScale === 'ELE'
        ? 64
        : assessment.ratingScale === 'SnapIV'
          ? 72
          : 72

    const assessmentScorePercentage = (assessment.resultAmount! / max) * 100
    setMaxScore(max)
    const timer = setTimeout(() => {
      setProgress(assessmentScorePercentage)
    }, 500)
    return () => clearTimeout(timer)
  }, [assessment.ratingScale, assessment.resultAmount])

  const margin = `${Math.trunc(progress)}%`
  const goodPercentage = `${Math.trunc((20 / 64) * 100)}%`
  const meanPercentage = `${Math.trunc((47 / 64) * 100)}%`

  return (
    <Card className="border border-slate-300 rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-center">
          Escala de Avaliação ELE (Leitura e Escrita)
        </CardTitle>
        <CardContent>
          <div className="mt-10">
            <div className="relative">
              <p className={`absolute right-0 mt-[-24px] `}>{maxScore}</p>
              <p className={cn(`absolute mt-[-24px]`)} style={{ left: margin }}>
                {Math.trunc((progress * maxScore) / 100)} Pontos
              </p>
              <div
                className={cn(
                  `absolute mt-2 flex flex-col justify-center items-center`,
                )}
                style={{ left: goodPercentage }}
              >
                <ArrowUp />
                <p className="absolute mt-10">Bom</p>
              </div>
              <div
                className={cn(
                  `absolute mt-2 flex flex-col justify-center items-center`,
                )}
                style={{ left: meanPercentage }}
              >
                <ArrowUp />
                <p className="absolute mt-10">Média</p>
              </div>
            </div>
            <Progress value={progress} className="bg-green-600/40" />
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default ELEDashboard
