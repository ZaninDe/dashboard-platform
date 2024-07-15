/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { Assessment, Dialog, School, Student } from '@prisma/client'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
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
  const [filteredAssessments, setFilteredAssessments] =
    useState<AssessmentWithDetails[]>(assessments)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(filters: z.infer<typeof formSchema>) {
    const filtered = assessments.filter((item) => {
      return (
        (filters.age === '' || item.student.age.toString() === filters.age) &&
        (filters.classroom === '' ||
          item?.student?.classroom === filters.classroom)
      )
    })
    setFilteredAssessments(filtered)
  }

  useEffect(() => {
    const ELEAssessments = filteredAssessments.filter(
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

    const SNAPIVAssessments = filteredAssessments.filter(
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
  }, [])

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
    }
  }, [])

  return (
    <div>
      {!firstRender && (
        <div className="space-y-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-4">
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
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" type="button">
                  Limpar Filtro
                  <EraserIcon className="ml-2 w-5 h-5" />
                </Button>
                <Button type="submit">
                  Filtrar <FilterIcon className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </form>
          </Form>
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
