import { Card, CardContent } from '@/components/ui/card'
import { criteriaOptions } from '@/const/diagnostic-criteria'
import { Dialog } from '@prisma/client'
import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface QuestionData {
  question: string
  answer: 'Sim' | 'Não'
}

interface QuestionCriteriaChart {
  criteriaDialogs: Dialog[]
}

const QuestionCriteriaChart = ({ criteriaDialogs }: QuestionCriteriaChart) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const COLORS = ['#86efac', '#f87171']

  const dataQuestions: QuestionData[] = []
  criteriaDialogs.forEach((criteriaDialog) => {
    const question = {
      question: criteriaDialog.question,
      answer: criteriaDialog.answer === 0 ? 'Não' : 'Sim',
    }
    dataQuestions.push(question)
  })

  const data: QuestionData[] = [
    { question: 'Pergunta 1', answer: 'Sim' },
    { question: 'Pergunta 2', answer: 'Não' },
    { question: 'Pergunta 3', answer: 'Sim' },
    { question: 'Pergunta 4', answer: 'Não' },
    // Continue com as demais perguntas...
  ]

  const aggregateData = (data: QuestionData[]) => {
    const result = {
      Sim: 0,
      Não: 0,
    }

    dataQuestions.forEach((item) => {
      if (item.answer === 'Sim') {
        result.Sim += 1
      } else {
        result.Não += 1
      }
    })

    return [
      { name: 'Sim', value: result.Sim },
      { name: 'Não', value: result.Não },
    ]
  }

  const pieChartData = aggregateData(dataQuestions)

  const handleClick = (data: { name: string }) => {
    setSelectedAnswer(data.name)
  }

  const filteredQuestions = selectedAnswer
    ? dataQuestions.filter((item) => item.answer === selectedAnswer)
    : []

  return (
    <div className="flex gap-24 mt-10">
      <div className="min-w-[320px]">
        <ResponsiveContainer width={340} height={400} className="">
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={160}
              fill="#bbf7d0"
              label
              labelLine={false}
              onClick={handleClick}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Card className="w-full">
        <CardContent className="p-4 h-full w-full">
          {selectedAnswer ? (
            <div>
              <h3 className="text-xl">
                Perguntas com resposta: {selectedAnswer}
              </h3>
              <ul>
                {filteredQuestions.map((question, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground border-b py-4"
                  >
                    {question.question}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              Clique em uma seção no gráfico para visualizar as questões
              relacionadas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default QuestionCriteriaChart
