'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { useState } from 'react'
import { School } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome é obrigatório',
  }),
  ra: z.string().min(2, {
    message: 'Registro do Aluno é obrigatório',
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
  const [newSchool, setNewSchool] = useState(false)
  const [nameSchool, setNameSchool] = useState('')
  const [addressSchool, setAddressSchool] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const toggleNewSchool = () => {
    setNewSchool((state) => !state)
  }

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const createNewSchool = async () => {
    toggleNewSchool()
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
          name="ra"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registro do Aluno</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 122042" {...field} />
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
          {!newSchool ? (
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
              <Button
                type="button"
                className="mt-2 flex gap-2"
                onClick={toggleNewSchool}
              >
                Nova Escola
                <School className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            // <SchoolForm onClose={toggleNewSchool} />
            <div className="border border-slate-300 px-2 py-4 rounded-md">
              <h1 className="text-xl text-slate-900 mb-3">
                Adicionar Nova Escola
              </h1>
              <div className="space-y-3">
                <Input
                  placeholder="Nome da Escola"
                  onChange={(e) => setNameSchool(e.target.value)}
                />
                <Input
                  placeholder="Endereço da Escola"
                  onChange={(e) => setAddressSchool(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={toggleNewSchool}
                  >
                    Fechar
                  </Button>
                  <Button type="button" onClick={createNewSchool}>
                    Salvar Nova Escola
                  </Button>
                </div>
              </div>
            </div>
          )}
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
