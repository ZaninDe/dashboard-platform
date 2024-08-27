'use client'
import { Assessment, Student, School, Dialog, CriteriaAssessment } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Combobox } from '@/components/ui/combobox'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import SNAPDashboard from './snapiv-dashboard'
import ATADashboard from './ata-dashboard'

export interface AssessmentWithDetails extends Assessment {
  student: Student & { school: School }
  dialog: Dialog[]
}

export interface CriteriaAssessmentWithDetails extends CriteriaAssessment {
  student: Student & { school: School }
  dialog: Dialog[]
}

interface DashboardsProps {
  assessments: AssessmentWithDetails[]
  criteriaAssessments: CriteriaAssessmentWithDetails[]
  students: Student[]
}

const formSchema = z.object({
  studentId: z.string().min(1),
})

const StudentDashboard = ({ assessments, criteriaAssessments, students }: DashboardsProps) => {
  const [currentStudent, setCurrentStudent] = useState<Student>()
  const [SNAPIVAssessmentes, setSNAPIVAssessmentes] =
    useState<AssessmentWithDetails>()
  const [ATAAssessmentes, setATAAssessmentes] =
    useState<AssessmentWithDetails>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values) {
        const newCurrentStudent = students.find(
          (student) => student.id === values.studentId,
        )
        const newSNAPIV = assessments.find(
          (assessment) =>
            assessment.studentId === newCurrentStudent?.id &&
            assessment.ratingScale === 'SnapIV',
        )
        newSNAPIV && setSNAPIVAssessmentes(newSNAPIV)

        const newATA = assessments.find(
          (assessment) =>
            assessment.studentId === newCurrentStudent?.id &&
            assessment.ratingScale === 'ATA',
        )
        newATA && setATAAssessmentes(newATA)

        setCurrentStudent(newCurrentStudent)
      }
    } catch (err) {
      toast.error('Algo de errado ocorreu.')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">
        Resultado Individual por Aluno
      </h1>
      <p className="text-muted-foreground text-center">
        Análise detalhada por avaliação através da visualização de gráficos.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:flex gap-4 items-center mx-auto mt-8 justify-center space-y-2 md:space-y-0"
        >
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem className="md:w-96">
                <FormControl>
                  <Combobox
                    placeholder="selecione um aluno..."
                    options={students.map((student) => ({
                      label: `${student.name} ${student.ra}`,
                      value: student.id,
                    }))}
                    {...field}
                    // value={newStudent?.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="flex items-center gap-2 w-full md:w-auto"
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            <Search className="w-4 h-4" />
            Pesquisar
          </Button>
        </form>
      </Form>
      <Card className="mt-8 p-4">
        {currentStudent ? (
          <div>
            <CardTitle className="flex justify-center md:justify-start md:gap-10 text-md md:text-xl px-6 pt-2">
              <div className="border-r-2 border-muted-foreground px-2 md:pr-10">
                {currentStudent?.name}
              </div>
              <div className="border-r-2 font-light border-muted-foreground px-2 md:pr-10">
                {currentStudent?.age} Anos
              </div>
              <div className="font-light px-2 md:px-0">
                {currentStudent?.classroom}
              </div>
            </CardTitle>
            <CardContent className="md:grid md:grid-cols-2 space-y-4 md:space-y-0 gap-2 mt-6 p-0">
              {SNAPIVAssessmentes && (
                <SNAPDashboard criteriaAssessment={criteriaAssessments.find((criteriaAssessment) => criteriaAssessment.assessmentId === SNAPIVAssessmentes.id)} assessment={SNAPIVAssessmentes} />
              )}
              {ATAAssessmentes && <ATADashboard criteriaAssessment={criteriaAssessments.find((criteriaAssessment) => criteriaAssessment.assessmentId === ATAAssessmentes.id)} assessment={ATAAssessmentes} />}
            </CardContent>
          </div>
        ) : (
          <CardContent className="flex justify-center items-center min-h-[60vh]">
            Selecione um Aluno para visualizar os resultados
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default StudentDashboard
