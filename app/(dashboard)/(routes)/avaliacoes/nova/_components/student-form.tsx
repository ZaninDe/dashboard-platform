'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { School } from 'lucide-react'
import Assessment from '../../page'
import { Combobox } from '@/components/ui/combobox'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome é obrigatório',
  }),
  age: z.string().min(1, {
    message: 'Idade é obrigatório',
  }),
  class: z.string().min(2, {
    message: 'Nome da escola é obrigatório',
  }),
  schoolId: z.string().min(2, {
    message: 'Nome da escola é obrigatório',
  }),
})

interface OptionsProps {
  label: string
  value: string
}

const ageOptions: OptionsProps[] = []
for (let i = 6; i <= 16; i++) {
  ageOptions.push({
    value: i.toString(),
    label: `${i} anos`,
  })
}

const classOptions: OptionsProps[] = []
for (let i = 1; i <= 9; i++) {
  classOptions.push({
    value: i.toString(),
    label: `${i}º Ano`,
  })
}

const schoolOptions = [
  {
    value: 'asdfasdfasdfwerqwr2341234',
    label: 'EMEF Lourdes Maria',
  },
  {
    value: '39q73r0efuqdfiodf',
    label: 'EMEF Nelson Ferreira',
  },
  {
    value: 'asdfhaisdfoasdf5432',
    label: 'EMEF Lourdes Maria',
  },
  {
    value: 'uasdfh2323nasldfadfasf',
    label: 'EEMEF Dom Pedro de Âlcantara',
  },
  {
    value: 'aisdjfoasijdf7293923',
    label: 'EEMEF Najila Jamile',
  },
]

const StudentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Aluno</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Gabriel Zanin de Oliveira" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  placeholder="Selecione a idade do aluno..."
                  options={ageOptions}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox
                  placeholder="Selecione o ano escolar..."
                  options={classOptions}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="schoolId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    placeholder="Selecione a escola..."
                    options={schoolOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" className="mt-2">
            Nova Escola
          </Button>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant={'outline'}>
            Fechar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}

export default StudentForm
