/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { Assessment, Dialog, School, Student } from '@prisma/client'

import { Button } from '@/components/ui/button'
import BarChatComponent from './graphs/bar'
import { Combobox } from '@/components/ui/combobox'
import {
  ageOptions,
  classOptions,
} from '../../avaliacoes/nova/_components/student-form'
import { EraserIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

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
  const [ratingScales, setRatingScales] = useState<number[]>([1, 2, 3])
  const [filterClassroom, setFillterClassroom] = useState<string | undefined>(
    undefined,
  )
  useState<AssessmentWithDetails[]>(assessments)

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
      pontos: ELEResultCounts[key],
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
      pontos: SNAPIVResultCounts[key],
    }))

    // @ts-ignore
    ELE && setELEData(ELE)
    // @ts-ignore
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

  const toggleScale = (item: number) => {
    let newArray = []
    if (ratingScales.includes(item)) {
      newArray = ratingScales.filter((scale) => scale !== item)
    } else {
      newArray = [...ratingScales, item]
    }
    setRatingScales(newArray)
  }

  return (
    <div>
      {!firstRender && (
        <div className="space-y-10">
          <div>
            <h2 className="font-bold text-lg">Escalas</h2>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleScale(1)}
            >
              <Checkbox
                checked={ratingScales.includes(1)}
                onCheckedChange={() => toggleScale(1)}
                className="form-checkbox h-4 w-4 text-red-400"
              />
              <p>ELE (Escala de Leitura e Escrita)</p>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleScale(2)}
            >
              <Checkbox
                checked={ratingScales.includes(2)}
                onCheckedChange={() => toggleScale(2)}
                className="form-checkbox h-4 w-4 text-red-400"
              />
              <p>SNAPIV (TDAH)</p>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleScale(3)}
            >
              <Checkbox
                checked={ratingScales.includes(3)}
                onCheckedChange={() => toggleScale(3)}
                className="form-checkbox h-4 w-4 text-red-400"
              />
              <p>ATA (TEA)</p>
            </div>
          </div>
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
          <div
            className={cn(
              'grid grid-col-1 gap-12 w-full h-[60vh]',
              ratingScales.length === 2 && 'grid-cols-2',
              ratingScales.length === 3 && 'grid-cols-3',
            )}
          >
            {ratingScales.includes(1) && (
              <div className="">
                <BarChatComponent
                  data={ELEData}
                  dataKeyX="resultAmount"
                  dataKeyY="pontos"
                />
              </div>
            )}

            {ratingScales.includes(2) && (
              <div>
                <BarChatComponent
                  data={SNAPIVData}
                  dataKeyX="resultAmount"
                  dataKeyY="pontos"
                />
              </div>
            )}

            {ratingScales.includes(3) && (
              <div className="">
                <BarChatComponent
                  data={SNAPIVData}
                  dataKeyX="resultAmount"
                  dataKeyY="pontos"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboards
