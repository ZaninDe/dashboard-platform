/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { Assessment, Dialog, School, Student } from '@prisma/client'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import BarChatComponent from './graphs/bar'
import { Combobox } from '@/components/ui/combobox'
import {
  ageOptions,
  classOptions,
} from '../../avaliacoes/nova/_components/student-form'
import { EraserIcon, FilterIcon } from 'lucide-react'

const formSchema = z.object({
  age: z.string().optional(),
  classroom: z.string().optional(),
})

interface AssessmentWithDetails extends Assessment {
  student: Student & { school: School }
  dialog: Dialog[]
}

interface DashboardsProps {
  assessments: AssessmentWithDetails[]
}

const Dashboards = ({ assessments }: DashboardsProps) => {
  const [ELEData, setELEData] = useState()
  const [SNAPIVData, setSNAPIVData] = useState()
  const [firstRender, setFirstRender] = useState(true)
  const [filterAge, setFilterAge] = useState<string | undefined>(undefined)
  const [filterClassroom, setFillterClassroom] = useState<string | undefined>(
    undefined,
  )
  useState<AssessmentWithDetails[]>(assessments)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    console.log('ATUALIZAR FILTROS: ')

    const filteredData = assessments.filter((item) => {
      return (
        (filterAge === undefined ||
          item.student.age.toString() === filterAge) &&
        (filterClassroom === undefined ||
          item?.student?.classroom === filterClassroom)
      )
    })
    const ELEAssessments = filteredData.filter(
      (item) => item.ratingScale === 'ELE',
    )
    const ELEResultCounts = ELEAssessments.reduce(
      (acc: Record<number, number>, assessment) => {
        if (assessment.resultAmount !== null) {
          acc[assessment.resultAmount] = (acc[assessment.resultAmount] || 0) + 1
        }
        return acc
      },
      {},
    )
    const ELE = Object.keys(ELEResultCounts).map((key: any) => ({
      resultAmount: Number(key),
      count: ELEResultCounts[key],
    }))

    const SNAPIVAssessments = filteredData.filter(
      (item) => item.ratingScale === 'SnapIV',
    )
    console.log('SNAP ASSESSMENTS', SNAPIVAssessments)
    const SNAPIVResultCounts = SNAPIVAssessments.reduce(
      (acc: Record<number, number>, assessment) => {
        if (assessment.resultAmount !== null) {
          acc[assessment.resultAmount] = (acc[assessment.resultAmount] || 0) + 1
        }
        console.log('ACC', acc)
        return acc
      },
      {},
    )
    const SNAPIV = Object.keys(SNAPIVResultCounts).map((key: any) => ({
      resultAmount: Number(key),
      count: SNAPIVResultCounts[key],
    }))

    ELE && setELEData(ELE)
    SNAPIV && setSNAPIVData(SNAPIV)
  }, [filterAge, filterClassroom])

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
    }
  }, [])

  const clearFilter = () => {
    setFilterAge(undefined)
    setFillterClassroom(undefined)
  }

  return (
    <div>
      {!firstRender && (
        <div className="space-y-10">
          <div className="flex gap-4">
            <Combobox
              onChange={(value) => setFilterAge(value)}
              placeholder={
                filterAge ? `${filterAge} Anos` : 'Selecione a idade...'
              }
              options={ageOptions}
            />
            <Combobox
              onChange={(value) => setFillterClassroom(value)}
              placeholder={filterClassroom || 'Selecione o ano escolar...'}
              options={classOptions}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button type="button" onClick={clearFilter}>
              Limpar Filtro
              <EraserIcon className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="grid grid-cols-2">
            <BarChatComponent
              data={ELEData}
              dataKeyX="resultAmount"
              dataKeyY="count"
            />

            <BarChatComponent
              data={SNAPIVData}
              dataKeyX="resultAmount"
              dataKeyY="count"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboards
