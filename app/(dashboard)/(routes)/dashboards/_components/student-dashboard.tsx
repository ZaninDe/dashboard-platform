'use client'
import { Assessment, Student, School, Dialog } from '@prisma/client'
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
import ELEDashboard from './ele-dashboard'
import SNAPDashboard from './snapiv-dashboard'
import ATADashboard from './ata-dashboard'

export interface AssessmentWithDetails extends Assessment {
  student: Student & { school: School }
  dialog: Dialog[]
}

interface DashboardsProps {
  assessments: AssessmentWithDetails[]
  students: Student[]
}

const formSchema = z.object({
  studentId: z.string().min(1),
})

const StudentDashboard = ({ assessments, students }: DashboardsProps) => {
  const [currentStudent, setCurrentStudent] = useState<Student>()
  const [ELEAssessment, setELEAssessment] = useState<AssessmentWithDetails>()
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
        const newELE = assessments.find(
          (assessment) =>
            assessment.studentId === newCurrentStudent?.id &&
            assessment.ratingScale === 'ELE',
        )
        newELE && setELEAssessment(newELE)
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

  console.log(ELEAssessment)
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        Resultado Individual por Aluno
      </h1>
      <p className="text-muted-foreground text-center">
        Análise detalhada por avaliação através da visualização de gráficos.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 items-center mx-auto mt-8 justify-center"
        >
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem className=" w-96">
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
            className="flex items-center gap-2"
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
            <CardTitle className="flex gap-10">
              <div className="border-r-2 border-muted-foreground pr-10">
                {currentStudent?.name}
              </div>
              <div className="border-r-2 font-light border-muted-foreground pr-10">
                {currentStudent?.age} Anos
              </div>
              <div className="font-light">{currentStudent?.classroom}</div>
            </CardTitle>
            <CardContent className="grid grid-cols-3 gap-2 mt-6">
              {ELEAssessment && <ELEDashboard assessment={ELEAssessment} />}
              {SNAPIVAssessmentes && (
                <SNAPDashboard assessment={SNAPIVAssessmentes} />
              )}
              {ATAAssessmentes && <ATADashboard assessment={ATAAssessmentes} />}
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
