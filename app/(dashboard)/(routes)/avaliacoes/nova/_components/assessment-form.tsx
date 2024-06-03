'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RatingScale, School } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useState } from 'react'
import StudentForm from './student-form'
import { PlusCircle } from 'lucide-react'

const RoleSchema = z.enum(Object.values(RatingScale) as [string, ...string[]])

const formSchema = z.object({
  userId: z.string(),
  studentId: z.string(),
  ratingScale: RoleSchema,
  schoolId: z.string(),
})

interface AssessmentFormProps {
  schoolOptions: School[]
}

const AssessmentForm = ({ schoolOptions }: AssessmentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const options = [
    {
      value: 'Gabriel Zanin de Oliveira 122042',
      label: 'Gabriel Zanin de Oliveira 122042',
    },
    {
      value: 'Carla Cristine de Souza 153042',
      label: 'Carla Cristine de Souza 153042',
    },
    {
      value: 'Pablo Miguel Ferreira Santos 164135',
      label: 'Pablo Miguel Ferreira Santos 164135',
    },
    {
      value: 'João Paulo de Melo 948823',
      label: 'João Paulo de Melo 948823',
    },
    {
      value: 'Maria de Souza Oliveira 912673',
      label: 'Maria de Souza Oliveira 912673',
    },
  ]

  const ratingScaleOptions = Object.keys(RatingScale).map((key) => ({
    label: key,
    value: RatingScale[key as keyof typeof RatingScale],
  }))
  return (
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
                    placeholder="Selecione um aluno..."
                    options={options.map((option) => ({
                      label: option.value,
                      value: option.label,
                    }))}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Dialog>
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
                  <StudentForm schoolOptions={schoolOptions}/>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
                    A escala de avaliação ELE (Escala de Linguagem Expressiva) é
                    uma ferramenta utilizada para avaliar as habilidades de
                    linguagem expressiva em crianças. A linguagem expressiva
                    refere-se à capacidade de uma pessoa de usar palavras,
                    frases e sentenças para se comunicar de forma eficaz.
                  </p>
                </div>

                <div className="mb-4">
                  <strong>SNAP-IV</strong>
                  <p>
                    A escala de avaliação SNAP-IV ajuda a identaificar e
                    monitorar sintomas de TDAH e Transtorno Desafiador Opositivo
                    em crianças e adolescentes, baseada nos critérios do DSM-IV.
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
        <Button type="submit">Iniciar Avaliação</Button>
      </form>
    </Form>
  )
}

export default AssessmentForm
