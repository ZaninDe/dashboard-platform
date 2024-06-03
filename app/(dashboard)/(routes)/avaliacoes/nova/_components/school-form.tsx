'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome da escola é obrigatório',
  }),
  address: z.string().min(2, {
    message: 'Endereço da escola é obrigatório',
  }),
})

interface SchoolFormProps {
  onClose: () => void
}

export function SchoolForm({ onClose }: SchoolFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log('ENTROUUUUU!!!')
      const response = await axios.post('/api/schools', values)
      toast.success('Escola criado com sucesso!')
    } catch (err) {
      toast.error('Algo deu errado.')
    }
  }

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  return (
    <div>
      <div>
        <label htmlFor="name">Nome da Escola</label>
        <Input
          id="name"
          placeholder="EMEF Lourdes Maria"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Endereço Completo</label>
        <Input
          id="address"
          placeholder="Ex: Carlos Alberto Consíglio, 282. Dom Pedro I - SJC"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  )
}
