import { db } from '@/lib/db'
import AssessmentForm from '../_components/assessment-form'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const NewAssessment = async () => {
  const schoolOptions = await db.school.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  const studentsOptions = await db.student.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="max-w-[920px]">
        <CardHeader>
          <CardTitle>Nova Avaliação</CardTitle>
          <CardDescription>
            Antes de iniciar a avaliação de um aluno, é necessário preencher
            algumas informações importantes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssessmentForm
            schoolOptions={schoolOptions}
            studentOptions={studentsOptions}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default NewAssessment
