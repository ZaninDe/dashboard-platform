/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { School as SchoolIcon } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { School } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GenderOptions, writingHypothesesOptions } from '@/const/rating-scales'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
  classroom: z.string().min(2, {
    message: 'Sala é obrigatório',
  }),
  writingHypotheses: z.string().min(2, {
    message: 'hipótese de escrita é obrigatório',
  }),
  gender: z.string().min(2, {
    message: 'sexo é obrigatório',
  }),
  schoolId: z.string().min(2, {
    message: 'Escola é obrigatório',
  }),
})

interface OptionsProps {
  label: string
  value: string
}

export const ageOptions: OptionsProps[] = []
for (let i = 6; i <= 16; i++) {
  ageOptions.push({
    value: i.toString(),
    label: `${i} anos`,
  })
}

export const classOptions: OptionsProps[] = []
for (let i = 1; i <= 9; i++) {
  classOptions.push({
    value: `${i}º Ano`,
    label: `${i}º Ano`,
  })
}

export interface OptionProps {
  label: string
  value: string
}
interface StudentFormProps {
  schoolOptions: School[]
  onChangeStudent: ({ label, value }: OptionProps) => void
  onClose: (value: boolean) => void
}

const StudentForm = ({
  schoolOptions,
  onClose,
  onChangeStudent,
}: StudentFormProps) => {
  // const [stateOptions, setStateOptions] = useState([])
  const [isNewSchool, setIsNewSchool] = useState(false)
  const [nameSchool, setNameSchool] = useState('')
  const [addressSchool, setAddressSchool] = useState('')
  const [stateSchool, setStateSchool] = useState('')
  const [citySchool, setCitySchool] = useState('')
  const [neighborhoodSchool, setNeighborhoodSchool] = useState('')
  const [regionSchool, setRegionSchool] = useState('')
  const [phoneSchool, setPhoneSchool] = useState('')
  const [newSchool, setNewSchool] = useState<OptionProps>()
  console.log(newSchool)

  // useEffect(() => {
  //   ;(async function getCities() {
  //     try {
  //       const response = await axios.get(
  //         'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  //       )
  //       const states = response.data
  //       // const statesOptions = states.map((item: any) => ({
  //       //   label: item.nome,
  //       //   value: item.nome,
  //       // }))
  //       setStateOptions(states)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })()
  // }, [])

  const router = useRouter()

  const { setValue } = useForm()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const toggleNewSchool = () => {
    setIsNewSchool((state: boolean) => !state)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/students', values)
      console.log(response)
      onChangeStudent({
        label: response.data.name,
        value: response.data.id,
      })
      onClose(false)
      toast.success('Aluno criado com sucesso!')
    } catch (err) {
      toast.error('Algo deu errado.')
    }
    console.log(values)
  }

  const createNewSchool = async () => {
    try {
      const response = await axios.post('/api/schools', {
        name: nameSchool,
        address: addressSchool,
        state: stateSchool,
        city: citySchool,
        neighborhood: neighborhoodSchool,
        region: regionSchool,
        phone: phoneSchool,
      })

      setNewSchool({
        value: response.data.id,
        label: response.data.name,
      })
      router.refresh()
      toggleNewSchool()
      toast.success('Escola criada com sucesso!')
      setValue('schoolId', response.data.id)
    } catch (err) {
      toast.error('Algo deu errado.')
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data, e) => {
          if (e) {
            e.preventDefault()
            e.stopPropagation()
          }
          onSubmit(data)
        })}
        className="space-y-8"
      >
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    placeholder="Selecione a idade..."
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    placeholder="Sexo"
                    options={GenderOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="classroom"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    placeholder="Ano Escolar..."
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
              name="writingHypotheses"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      placeholder="Hipótese de escrita"
                      options={writingHypothesesOptions}
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
                  A <strong>hipótese de escrita</strong> é uma ideia ou
                  suposição que uma criança faz sobre como a escrita funciona
                  enquanto ela está aprendendo a ler e escrever. Imagine que uma
                  criança está tentando entender como as letras e palavras
                  funcionam. Ela pode começar fazendo suposições sobre o que uma
                  certa combinação de letras significa ou como formar palavras.
                  Essas suposições são suas hipóteses de escrita.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div>
          {!isNewSchool ? (
            <div>
              <FormField
                control={form.control}
                name="schoolId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        placeholder="Selecione a escola..."
                        options={schoolOptions.map((school) => ({
                          label: school.name,
                          value: school.id,
                        }))}
                        {...field}
                        // value={newSchool?.value}
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
                <SchoolIcon className="w-4 h-4" />
              </Button>
            </div>
          ) : (
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
                <Input
                  placeholder="Estado"
                  onChange={(e) => setStateSchool(e.target.value)}
                />
                <Input
                  placeholder="Cidade"
                  onChange={(e) => setCitySchool(e.target.value)}
                />
                <Input
                  placeholder="Bairro"
                  onChange={(e) => setNeighborhoodSchool(e.target.value)}
                />
                <Input
                  placeholder="Região"
                  onChange={(e) => setRegionSchool(e.target.value)}
                />
                <Input
                  placeholder="Telefone Principal"
                  onChange={(e) => setPhoneSchool(e.target.value)}
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
