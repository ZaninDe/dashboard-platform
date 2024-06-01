'use client'

import { redirect, useRouter } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

const Assessment = () => {
  type Payment = {
    id: string
    amount: number
    status: 'pending' | 'processing' | 'success' | 'failed'
    email: string
  }

  const data: Payment[] = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com',
    },
    // ...
  ]
  const { userId } = useAuth()
  if (!userId) {
    redirect('/')
  }

  const handleNewAssessment = () => {
    router.push('/avaliacoes/nova')
  }

  const router = useRouter()
  return (
    <div className="mx-auto mt-10 px-10">
      <h1 className="text-4xl text-slate-900 mb-8">Avaliações</h1>
      <div className="w-full flex justify-end">
        <Button className="mb-4" onClick={handleNewAssessment}>
          Nova Avaliação
          <PlusCircle className="ml-4" />
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Assessment
