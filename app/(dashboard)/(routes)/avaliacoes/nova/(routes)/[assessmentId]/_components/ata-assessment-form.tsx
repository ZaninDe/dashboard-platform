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
  const [step, setStep] = useState(1)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

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
    if (step === questions.length) {
      router.push(`/avaliacoes/${assessment.id}`)
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

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId],
    )
  }

  const onSubmit = async () => {
    try {
      if (dialogs[step]?.answer === selectedItems) {
        return
      }
      const dialog = await axios.post(
        `/api/assessments/${assessment.id}/dialogs`,
        {
          questionNumber: step,
          question: questions[step].question,
          answer: selectedItems,
        },
      )
      console.log(dialog)
      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error('Algo deu errado.')
    } finally {
      setSelectedItems([])
      nextStep()
    }
  }
  return (
    <div className="w-full h-full p-4">
      <p className="font-bold">{`Questão ${step}`}</p>
      <div className="w-full h-full flex flex-col justify-around items-center">
        <div>
          <div>
            <div className="h-20 flex flex-col items-center justify-center">
              <p className="text-center text-xl">{questions[step]?.question}</p>
            </div>
            <div className="">
              {questions[step]?.options.map((option) => (
                <div
                  key={option.index}
                  className="flex flex-row items-center space-x-3 space-y-2 border-b pb-2"
                >
                  <Checkbox
                    checked={selectedItems.includes(option.index)}
                    onCheckedChange={() => handleCheckboxChange(option.index)}
                    className="form-checkbox h-4 w-4 text-red-400 mt-2"
                  />
                  <label className="font-normal">{option.item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between mt-auto mb-10">
          <Button variant="secondary" onClick={prevStep}>
            Voltar
          </Button>
          <Button onClick={onSubmit} disabled={!questions.length}>
            {step === questions.length ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ATAAssessmentForm
