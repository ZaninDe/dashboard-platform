'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RatingScale, School, Student } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Combobox } from '@/components/ui/combobox'
import { useEffect, useState } from 'react'
import StudentForm, { OptionProps } from './student-form'
import { PlusCircle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const RoleSchema = z.enum(Object.values(RatingScale) as [string, ...string[]])

const formSchema = z.object({
  studentId: z.string(),
  ratingScale: RoleSchema,
})

interface AssessmentFormProps {
  schoolOptions: School[]
  studentOptions: Student[]
}

const AssessmentForm = ({
  schoolOptions,
  studentOptions,
}: AssessmentFormProps) => {
  const [newStudentIsOpen, setNewStudentIsOpen] = useState(false)
  const [newStudent, setNewStudent] = useState<OptionProps>()

  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [newStudent])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/assessments', values)
      console.log(response)
      router.push(`/avaliacoes/nova/${response.data.id}`)

      toast.success('Aluno criado com sucesso!')
    } catch (err) {
      toast.error('Algo deu errado.')
    }
    console.log(values)
  }

  const { isValid, isSubmitting } = form.formState

  const ratingScaleOptions = Object.keys(RatingScale).map((key) => ({
    label: key,
    value: RatingScale[key as keyof typeof RatingScale],
  }))
  return (
    <div className="space-y-4">
      <Dialog
        onOpenChange={() => setNewStudentIsOpen(true)}
        open={newStudentIsOpen}
      >
        <DialogTrigger asChild>
          <Button className="mt-2 flex gap-2">
            Novo Aluno <PlusCircle className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl mb-10">
              Cadastrar Novo Aluno
            </DialogTitle>
            <DialogDescription>
              <StudentForm
                onChangeStudent={setNewStudent}
                schoolOptions={schoolOptions}
                onClose={setNewStudentIsOpen}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      placeholder="selecione um aluno..."
                      options={studentOptions.map((student) => ({
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
          </div>

          <div>
            <FormField
              control={form.control}
              name="ratingScale"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      placeholder="Selecione uma escala para a avaliação"
                      options={ratingScaleOptions}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="mt-2 underline" type="button">
                  Entenda qual escala utilizar
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px]">
                  <div className="mb-4">
                    <strong>ELE</strong>
                    <p>
                      A escala de avaliação ELE (Escala de Linguagem Expressiva)
                      é uma ferramenta utilizada para avaliar as habilidades de
                      linguagem expressiva em crianças. A linguagem expressiva
                      refere-se à capacidade de uma pessoa de usar palavras,
                      frases e sentenças para se comunicar de forma eficaz.
                    </p>
                  </div>

                  <div className="mb-4">
                    <strong>SNAP-IV</strong>
                    <p>
                      A escala de avaliação SNAP-IV ajuda a identaificar e
                      monitorar sintomas de TDAH e Transtorno Desafiador
                      Opositivo em crianças e adolescentes, baseada nos
                      critérios do DSM-IV.
                    </p>
                  </div>
                  <div className="mb-4">
                    <strong>ATA</strong>
                    <p>
                      A escala de avaliação ATA (Avaliação de Transtornos de
                      Aprendizagem) é utilizada para identificar dificuldades de
                      aprendizagem em crianças e adolescentes. Ela ajuda a
                      detectar problemas específicos como dislexia, disgrafia e
                      discalculia.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Iniciar Avaliação
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AssessmentForm
