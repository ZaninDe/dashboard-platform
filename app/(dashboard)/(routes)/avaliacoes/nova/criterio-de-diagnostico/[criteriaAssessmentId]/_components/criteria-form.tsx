/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { Button } from '@/components/ui/button'
import { QuestionsProps } from '@/const/rating-scales'
import { cn } from '@/lib/utils'
import { CriteriaAssessment, Dialog } from '@prisma/client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { LoaderCircleIcon } from 'lucide-react'
import {
  criteriaOptions,
  TDAHDiagnosticQuestions,
  TEADiagnosticQuestions,
} from '@/const/diagnostic-criteria'

interface CriteriaFormProps {
  criteriaAssessment: CriteriaAssessment
  dialogs: Dialog[]
}

const CriteriaForm = ({ criteriaAssessment, dialogs }: CriteriaFormProps) => {
  const [step, setStep] = useState(criteriaAssessment?.currentStep | 1)
  const [answer, setAnswer] = useState<number | null>()
  const [currentDialog, setCurrentDialog] = useState<Dialog>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const newCurrentDialog = dialogs.find(
      (dialog) => dialog.questionNumber === step,
    )
    if (newCurrentDialog) {
      setCurrentDialog(newCurrentDialog)
      // @ts-ignore
      setAnswer(newCurrentDialog?.answer)
    }
  }, [step, dialogs])

  const router = useRouter()

  const questions: QuestionsProps[] =
    criteriaAssessment?.ratingScale === 'ATA'
      ? TEADiagnosticQuestions
      : TDAHDiagnosticQuestions

  const nextStep = () => {
    if (step === questions.length) {
      router.push(`/avaliacoes/${criteriaAssessment.assessmentId}`)
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
    setIsSubmitting(true)
    try {
      if (currentDialog?.answer === answer) {
        return
      }
      await axios.post(
        `/api/criteria-assessments/${criteriaAssessment.id}/dialogs`,
        {
          questionNumber: step,
          question: questions[step - 1].question,
          answer,
          step,
        },
      )

      if (step === questions.length) {
        router.push(`/avaliacoes/${criteriaAssessment.assessmentId}`)
        console.log('resultado salvo com sucesso!')
      }

      router.refresh()
    } catch (err) {
      toast.error('Algo deu errado.')
      console.log(err)
    } finally {
      setIsSubmitting(false)
      setAnswer(null)
      nextStep()
    }
  }
  const isDisabled =
    (!answer && !questions.length) || isSubmitting || answer === null
  return (
    <div className="w-full h-full">
      <p className="font-bold p-4">{`Questão ${step} de ${questions.length}`}</p>
      <div className="w-full h-full flex flex-col justify-around items-center p-4">
        <div>
          <div>
            <div className="min-h-40 flex flex-col items-center justify-center">
              <p className="text-center text-xl">
                {questions[step - 1]?.question}
              </p>
            </div>
            <div className="flex gap-4 justify-center mt-4">
              {criteriaOptions.map((button) => (
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
        <div className="w-full flex justify-between p-4">
          <Button variant="secondary" onClick={prevStep}>
            Voltar
          </Button>
          <Button onClick={onSubmit} disabled={isDisabled} className="w-20">
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <p>{step === questions.length ? 'Finalizar' : 'Próximo'}</p>
            )}
          </Button>
        </div>
      </div>
      <p className="bg-yellow-500/80 w-full p-4 rounded-md text-white">
        <strong>*ATENÇÃO*</strong> Não se preocupe em sair desta página, a
        avaliação é salva automaticamente a cada resposta
      </p>
    </div>
  )
}

export default CriteriaForm
