'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RatingScale } from '@prisma/client'
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

import { Combobox } from '@/components/ui/combobox'
import { useState } from 'react'
import StudentForm from './student-form'

const RoleSchema = z.enum(Object.values(RatingScale) as [string, ...string[]])

const formSchema = z.object({
  userId: z.string(),
  studentId: z.string(),
  ratingScale: RoleSchema,
  schoolId: z.string(),
})

const AssessmentForm = () => {
  const [isNewStudent, setIsNewstudent] = useState(false)

  const toggleNewStudent = () => {
    setIsNewstudent((state) => !state)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      studentId: '',
      ratingScale: 'ELE',
      schoolId: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const options = [
    {
      value: 'Gabriel Zanin de Oliveira',
      label: 'Gabriel Zanin de Oliveira',
    },
    {
      value: 'Carla Cristine de Souza',
      label: 'Carla Cristine de Souza',
    },
    {
      value: 'Pablo Miguel Ferreira Santos',
      label: 'Pablo Miguel Ferreira Santos',
    },
    {
      value: 'João Paulo de Melo',
      label: 'João Paulo de Melo',
    },
    {
      value: 'Maria de Souza Oliveira',
      label: 'Maria de Souza Oliveira',
    },
  ]
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
              <Button className="mt-2">Novo Aluno</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl mb-10">
                  Cadastrar Novo Aluno
                </DialogTitle>
                <DialogDescription>
                  <StudentForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

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
        <Button type="button">Novo Aluno</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AssessmentForm
