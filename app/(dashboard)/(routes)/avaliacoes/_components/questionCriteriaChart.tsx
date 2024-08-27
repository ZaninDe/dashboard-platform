'use client'
import { Card, CardContent } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/useIsMobile'
import { Dialog } from '@prisma/client'
import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface QuestionData {
  question: string
  answer: string
}

interface QuestionCriteriaChart {
  criteriaDialogs: Dialog[]
}

const QuestionCriteriaChart = ({ criteriaDialogs }: QuestionCriteriaChart) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const isMobile = useIsMobile()
  console.log('IS MOBILE: ', isMobile)

  const COLORS = ['#86efac', '#f87171']

  const dataQuestions: QuestionData[] = []
  criteriaDialogs.forEach((criteriaDialog) => {
    const question = {
      question: criteriaDialog.question,
      answer: criteriaDialog.answer === 0 ? 'Não' : 'Sim',
    }
    dataQuestions.push(question)
  })

  const aggregateData = () => {
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

  const pieChartData = aggregateData()

  const handleClick = (data: { name: string }) => {
    setSelectedAnswer(data.name)
  }

  const filteredQuestions = selectedAnswer
    ? dataQuestions.filter((item) => item.answer === selectedAnswer)
    : []

  return (
    <div className="md:flex gap-24 mt-10">
      <div className="md:min-w-[320px] flex justify-center">
        <ResponsiveContainer
          width={isMobile ? 220 : 340}
          height={isMobile ? 300 : 400}
          className=""
        >
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={isMobile ? 105 : 160}
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
