'use client'

import { redirect, useRouter } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { AssessmentProps, columns } from './columns'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

const Assessment = () => {
  const data: AssessmentProps[] = [
    {
      id: '728ed52f',
      name: 'Gabriel Zanin',
      school: 'Caic',
      age: 10,
      classroom: '5ª série',
      status: 'attention',
    },
    {
      id: '34134fasdf',
      name: 'Carla Zanin',
      school: 'Nova Escola',
      age: 13,
      classroom: '8ª série',
      status: 'OK',
    },
    {
      id: 'asdfas343443',
      name: 'Rafael Pereira',
      school: 'Caic',
      age: 11,
      classroom: '4ª série',
      status: 'attention',
    },
    {
      id: '4536345rfdsa',
      name: 'Felipe Assis',
      school: 'Nova Escola',
      age: 15,
      classroom: '9ª série',
      status: 'OK',
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
