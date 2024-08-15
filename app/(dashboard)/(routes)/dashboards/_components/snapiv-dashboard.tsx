'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AssessmentWithDetails } from './student-dashboard'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface SNAPDashboardProps {
  assessment: AssessmentWithDetails
}

const SNAPDashboard = ({ assessment }: SNAPDashboardProps) => {
  const [progress, setProgress] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  const router = useRouter()

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

  const handleSeeAssessment = () => {
    router.push(`/avaliacoes/${assessment.id}`)
  }

  return (
    <Card className="border border-slate-300 rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-center">
          Escala SNAPIV (TDAH)
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="mt-10">
          <div className="relative">
            <p className={`absolute right-0 mt-[-24px] `}>{maxScore}</p>
            <p className={cn(`absolute mt-[-24px]`)} style={{ left: margin }}>
              {Math.trunc((progress * maxScore) / 100)} Pontos
            </p>
            {/* <div
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
            </div> */}
          </div>
          <Progress value={progress} className="bg-green-600/40" />
        </div>
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
              <strong>CRITÉRIO E: </strong>Se existe um outro problema (tal como
              depressão, deficiência mental, psicose, etc.), os sintomas não
              podem ser atribuídos exclusivamente a ele.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="link" onClick={handleSeeAssessment}>
          Ver Avaliação
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SNAPDashboard
