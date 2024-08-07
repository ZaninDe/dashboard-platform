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
import { EraserIcon, Trash2Icon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { GenderOptions, writingHypothesesOptions } from '@/const/rating-scales'

interface AssessmentWithDetails extends Assessment {
  student: Student & { school: School }
  dialog: Dialog[]
}

interface DashboardsProps {
  assessments: AssessmentWithDetails[]
  schools: School[]
}

const Dashboards = ({ assessments, schools }: DashboardsProps) => {
  const [ELEData, setELEData] = useState()
  const [SNAPIVData, setSNAPIVData] = useState()
  const [firstRender, setFirstRender] = useState(true)
  const [filterAge, setFilterAge] = useState<string | undefined>(undefined)
  const [filterGender, setFilterGender] = useState<string | undefined>(
    undefined,
  )
  const [filterWriting, setFilterWriting] = useState<string | undefined>(
    undefined,
  )
  const [filterSchoolState, setFilterSchoolState] = useState<
    string | undefined
  >(undefined)
  const [filterSchoolCity, setFilterSchoolCity] = useState<string | undefined>(
    undefined,
  )
  const [filterSchoolNeighborhood, setFilterSchoolNeighborhood] = useState<
    string | undefined
  >(undefined)
  const [filterSchoolRegion, setFilterSchoolRegion] = useState<
    string | undefined
  >(undefined)
  const [ratingScales, setRatingScales] = useState<number[]>([1, 2, 3])
  const [filterClassroom, setFillterClassroom] = useState<string | undefined>(
    undefined,
  )
  useState<AssessmentWithDetails[]>(assessments)

  useEffect(() => {
    const filteredData = assessments.filter((item) => {
      return (
        (filterAge === undefined ||
          item.student.age.toString() === filterAge) &&
        (filterClassroom === undefined ||
          item?.student?.classroom === filterClassroom) &&
        (filterGender === undefined ||
          item?.student?.gender === filterGender) &&
        (filterWriting === undefined ||
          item?.student?.writingHypotheses === filterWriting) &&
        (filterSchoolState === undefined ||
          item?.student?.school?.state === filterSchoolState) &&
        (filterSchoolCity === undefined ||
          item?.student?.school?.city === filterSchoolCity) &&
        (filterSchoolNeighborhood === undefined ||
          item?.student?.school?.neighborhood === filterSchoolNeighborhood) &&
        (filterSchoolRegion === undefined ||
          item?.student?.school?.region === filterSchoolRegion)
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
  }, [
    filterAge,
    filterClassroom,
    filterGender,
    filterWriting,
    filterSchoolState,
    filterSchoolCity,
    filterSchoolNeighborhood,
    filterSchoolRegion,
  ])

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
    }
  }, [])

  const clearFilter = () => {
    setFilterAge(undefined)
    setFillterClassroom(undefined)
    setFilterGender(undefined)
    setFilterWriting(undefined)
    setFilterSchoolState(undefined)
    setFilterSchoolCity(undefined)
    setFilterSchoolNeighborhood(undefined)
    setFilterSchoolRegion(undefined)
    setRatingScales([1, 2, 3])
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

  // @ts-ignore
  const uniqueStates = [...new Set(schools.map((school) => school.state))]
  // @ts-ignore
  const uniqueCities = [...new Set(schools.map((school) => school.city))]
  const uniqueNeighborhoods = [
    // @ts-ignore
    ...new Set(schools.map((school) => school.neighborhood)),
  ]
  // @ts-ignore
  const uniqueRegions = [...new Set(schools.map((school) => school.region))]
  console.log(uniqueStates)
  return (
    <div>
      {!firstRender && (
        <div className="space-y-10 pb-10">
          <div className="flex gap-4 items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      '',
                      ratingScales.length !== 3 && 'bg-neutral-100',
                    )}
                  >
                    Escalas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-4">
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
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      '',
                      (filterAge ||
                        filterClassroom ||
                        filterGender ||
                        filterWriting) &&
                        'bg-neutral-100',
                    )}
                  >
                    Aluno
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 space-y-4 w-[300px]">
                      <div className="flex gap-2 items-center">
                        {filterAge && (
                          <Trash2Icon
                            className="cursor-pointer"
                            onClick={() => setFilterAge(undefined)}
                          />
                        )}
                        <Combobox
                          onChange={(value) => setFilterAge(value)}
                          placeholder={
                            filterAge
                              ? `${filterAge} Anos`
                              : 'Selecione a idade...'
                          }
                          options={ageOptions}
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        {filterClassroom && (
                          <Trash2Icon
                            className="cursor-pointer"
                            onClick={() => setFillterClassroom(undefined)}
                          />
                        )}
                        <Combobox
                          onChange={(value) => setFillterClassroom(value)}
                          placeholder={
                            filterClassroom || 'Selecione o ano escolar...'
                          }
                          options={classOptions}
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        {filterGender && (
                          <Trash2Icon
                            className="cursor-pointer"
                            onClick={() => setFilterGender(undefined)}
                          />
                        )}
                        <Combobox
                          onChange={(value) => setFilterGender(value)}
                          placeholder={filterGender || 'Selecione o sexo...'}
                          options={GenderOptions}
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        {filterWriting && (
                          <Trash2Icon
                            className="cursor-pointer"
                            onClick={() => setFilterWriting(undefined)}
                          />
                        )}
                        <Combobox
                          onChange={(value) => setFilterWriting(value)}
                          placeholder={
                            filterWriting ||
                            'Selecione a hipótese de escrita...'
                          }
                          options={writingHypothesesOptions}
                        />
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      '',
                      (filterSchoolState ||
                        filterSchoolCity ||
                        filterSchoolNeighborhood ||
                        filterSchoolRegion) &&
                        'bg-neutral-100',
                    )}
                  >
                    Escola
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 space-y-4 w-[300px]">
                      <div className="flex gap-2 items-center">
                        {filterSchoolState && (
                          <Trash2Icon
                            className="cursor-pointer"
                            onClick={() => setFilterSchoolState(undefined)}
                          />
                        )}
                        <Combobox
                          onChange={(value) => setFilterSchoolState(value)}
                          placeholder={
                            filterSchoolState || 'Selecione o Estado...'
                          }
                          options={uniqueStates.map((state) => ({
                            label: state,
                            value: state,
                          }))}
                        />
                      </div>

                      <div className="flex gap-2 items-center">
                        {filterSchoolCity && (
                          <Trash2Icon
                            className="cursor-pointer"
                            onClick={() => setFilterSchoolCity(undefined)}
                          />
                        )}
                        <Combobox
                          onChange={(value) => setFilterSchoolCity(value)}
                          placeholder={
                            filterSchoolCity || 'Selecione a cidade...'
                          }
                          options={uniqueCities.map((city) => ({
                            label: city,
                            value: city,
                          }))}
                        />
                      </div>

                      <div className="flex gap-2 items-center">
                        {filterSchoolNeighborhood && (
                          <Trash2Icon
                            className="cursor-pointer"
                            onClick={() =>
                              setFilterSchoolNeighborhood(undefined)
                            }
                          />
                        )}
                        <Combobox
                          onChange={(value) =>
                            setFilterSchoolNeighborhood(value)
                          }
                          placeholder={
                            filterSchoolNeighborhood || 'Selecione o bairro...'
                          }
                          options={uniqueNeighborhoods.map((neighborhood) => ({
                            label: neighborhood,
                            value: neighborhood,
                          }))}
                        />
                      </div>

                      <div className="flex gap-2 items-center">
                        {filterSchoolRegion && (
                          <Trash2Icon
                            className="cursor-pointer"
                            onClick={() => setFilterSchoolRegion(undefined)}
                          />
                        )}
                        <Combobox
                          onChange={(value) => setFilterSchoolRegion(value)}
                          placeholder={
                            filterSchoolRegion || 'Selecione a região...'
                          }
                          options={uniqueRegions.map((region) => ({
                            label: region,
                            value: region,
                          }))}
                        />
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button type="button" onClick={clearFilter}>
              Limpar Filtro
              <EraserIcon className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div
            className={cn(
              'grid grid-col-1 gap-12 w-full h-[60vh] relative',
              ratingScales.length === 2 && 'grid-cols-2',
              ratingScales.length === 3 && 'grid-cols-3',
            )}
          >
            {ratingScales.includes(1) && (
              <div className="max-h-[60vh]">
                <h1 className="text-center mb-4 font-bold text-muted-foreground">
                  ELE
                </h1>
                <BarChatComponent
                  data={ELEData}
                  dataKeyX="resultAmount"
                  dataKeyY="pontos"
                  color="#3b82f6"
                />
              </div>
            )}

            {ratingScales.includes(2) && (
              <div className="max-h-[60vh]">
                <h1 className="text-center mb-4 font-bold text-muted-foreground">
                  SNAPIV
                </h1>
                <BarChatComponent
                  data={SNAPIVData}
                  dataKeyX="resultAmount"
                  dataKeyY="pontos"
                  color="#22c55e"
                />
              </div>
            )}

            {ratingScales.includes(3) && (
              <div className="max-h-[60vh]">
                <h1 className="text-center mb-4 font-bold text-muted-foreground">
                  ATA
                </h1>
                <BarChatComponent
                  data={SNAPIVData}
                  dataKeyX="resultAmount"
                  dataKeyY="pontos"
                  color="#fde047"
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
