import AssessmentForm from '../_components/assessment-form'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const NewAssessment = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="max-w-[920px]">
        <CardHeader>
          <CardTitle>Nova Avaliação</CardTitle>
          <CardDescription>
            Antes de iniciar a avaliação de um aluno, é necessário preencher
            algumas informações importante
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssessmentForm />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NewAssessment
