'use client'

import { Button } from '@/components/ui/button'
import { ButtonOption, QuestionsProps } from '@/const/rating-scales'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface AssessmentFormProps {
  buttonOptions: ButtonOption[]
  questions: QuestionsProps[]
}

const AssessmentForm = ({ buttonOptions, questions }: AssessmentFormProps) => {
  const [step, setStep] = useState(1)
  const [answer, setAnswer] = useState<number | null>(null)

  const nextStep = () => {
    if (step === questions.length) {
      console.log('ULTIMA QUESTAO')
    } else {
      setStep((state) => state + 1)
    }
  }

  const prevStep = () => {
    if (step === 1) {
      console.log('PRIMEIRA QUESTAO')
    } else {
      setStep((state) => state - 1)
    }
  }

  const onSubmit = async () => {
    try {
      console.log(answer)
    } catch (err) {
      toast.error('Algo deu errado.')
    } finally {
      setAnswer(null)
      nextStep()
    }
  }
  return (
    <div className="w-full h-full p-4">
      <p className="font-bold">{`Questão ${step}`}</p>
      <div className="w-full h-full flex flex-col justify-around items-center">
        <div>
          <div>
            <div className="h-40 flex flex-col items-center justify-center">
              <p className="text-center text-xl">{questions[step].question}</p>
            </div>
            <div className="flex gap-4 justify-center">
              {buttonOptions.map((button) => (
                <Button
                  className={cn(
                    'bg-transparent',
                    button.value === answer?.toString() && 'bg-slate-200',
                  )}
                  key={button.value}
                  variant="outline"
                  onClick={() => {
                    setAnswer(parseInt(button.value))
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Button variant="secondary" onClick={prevStep}>
            Voltar
          </Button>
          <Button onClick={onSubmit} disabled={!answer}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AssessmentForm
