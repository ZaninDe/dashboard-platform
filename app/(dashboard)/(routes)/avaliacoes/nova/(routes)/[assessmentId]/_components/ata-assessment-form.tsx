'use client'

import { Button } from '@/components/ui/button'
import { ATAQuestions, ATAQuestionsProps } from '@/const/rating-scales'
import { Assessment, Dialog } from '@prisma/client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { JsonValue } from '@prisma/client/runtime/library'
import { LoaderCircleIcon } from 'lucide-react'

interface ATAAssessmentFormProps {
  assessment: Assessment
  dialogs: Dialog[]
}

function jsonValueToNumberArray(value: JsonValue): number[] {
  if (typeof value === 'number') {
    return [value]
  } else if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'number') as number[]
  } else {
    return []
  }
}

const ATAAssessmentForm = ({ assessment, dialogs }: ATAAssessmentFormProps) => {
  const [step, setStep] = useState(assessment?.currentStep | 1)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const newCurrentDialog = dialogs.find(
      (dialog) => dialog.questionNumber === step,
    )
    if (newCurrentDialog) {
      const array = jsonValueToNumberArray(newCurrentDialog?.answer)
      setSelectedItems(array)
    }
  }, [step, dialogs])

  const router = useRouter()

  const questions: ATAQuestionsProps[] = ATAQuestions

  const nextStep = () => {
    setStep((state) => state + 1)
  }

  const prevStep = () => {
    setStep((state) => state - 1)
  }

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId],
    )
  }

  const onSubmitFinish = async () => {
    setIsSubmitting(true)
    try {
      const newCriteriaAssessment = await axios.put(
        `/api/assessments/${assessment.id}/finish`,
        {},
      )
      router.push(
        `/avaliacoes/nova/criterio-de-diagnostico/${newCriteriaAssessment.data.id}`,
      )
      console.log('resultado salvo com sucesso!')
      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error('Algo deu errado.', { duration: 4000 })
    } finally {
      setIsSubmitting(false)
      setSelectedItems([])
      nextStep()
    }
  }

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      if (dialogs[step]?.answer === selectedItems) {
        return
      }
      await axios.post(`/api/assessments/${assessment.id}/dialogs`, {
        questionNumber: step,
        question: questions[step - 1].question,
        answer: selectedItems,
        step,
      })
      if (step === questions.length) {
        onSubmitFinish()
      } else {
        nextStep()
      }
    } catch (err) {
      console.log(err)
      toast.error('Algo deu errado.', { duration: 4000 })
    } finally {
      setIsSubmitting(false)
      setSelectedItems([])
    }
  }

  const isDisabled = !questions.length || isSubmitting
  return (
    <div className="h-full">
      {step <= questions.length && (
        <div className="w-full h-full p-4">
          <p className="font-bold">{`Questão ${step} de 23`}</p>
          <div className="flex md:hidden w-full justify-between py-2 mt-6">
            <Button variant="secondary" onClick={prevStep}>
              Voltar
            </Button>
            <Button onClick={onSubmit} disabled={isDisabled} className="w-20">
              {isSubmitting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <p>Próximo</p>
              )}
            </Button>
          </div>
          <div className="w-full h-full flex flex-col justify-start mt-10 md:mt-0 items-center">
            <div>
              <div>
                <div className="mb-2 flex flex-col items-center justify-center">
                  <p className="text-center text-xl md:mt-10">
                    {questions[step - 1]?.question}
                  </p>
                </div>
                <div className="">
                  {questions[step - 1]?.options.map((option) => (
                    <div
                      key={option.index}
                      className="flex flex-row items-center space-x-3 space-y-2 border-b pb-2"
                    >
                      <Checkbox
                        checked={selectedItems.includes(option.index)}
                        onCheckedChange={() =>
                          handleCheckboxChange(option.index)
                        }
                        className="form-checkbox h-4 w-4 text-red-400 mt-2"
                      />
                      <label className="font-normal">{option.item}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:flex w-full justify-between absolute bottom-4 p-2">
              <Button variant="secondary" onClick={prevStep}>
                Voltar
              </Button>
              <Button onClick={onSubmit} disabled={isDisabled} className="w-20">
                {isSubmitting ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  <p>Próximo</p>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      <p className="bg-yellow-500/80 w-full p-4 rounded-b-md text-white absolute bottom-[-100px]">
        <strong>*ATENÇÃO*</strong> Não se preocupe em sair desta página, a
        avaliação é salva automaticamente a cada resposta
      </p>
    </div>
  )
}

export default ATAAssessmentForm
