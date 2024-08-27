/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { Assessment, Dialog, School, Student } from '@prisma/client'

import { Button } from '@/components/ui/button'
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
import { Card, CardContent } from '@/components/ui/card'
interface AssessmentWithDetails extends Assessment {
  student: Student & { school: School }
  dialog: Dialog[]
}

interface DashboardsProps {
  assessments: AssessmentWithDetails[]
  schools: School[]
}

const Dashboards = ({ assessments, schools }: DashboardsProps) => {
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
    if (firstRender) {
      setFirstRender(false)
    }
  }, [firstRender])

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
              'grid grid-col-1 gap-12 w-full',
              // ratingScales.length === 2 && 'grid-cols-2',
              // ratingScales.length === 3 && 'grid-cols-3',
            )}
          >
            <Card className="flex flex-col items-center justify-center">
              <CardContent className="w-full py-8 px-10">
                <h1 className="text-center mb-16 font-bold text-3xl">
                  ESCALA DE AVALIAÇÃO DE LEITURA E ESCRITA
                </h1>
                <div className="w-full grid gap-32 grid-cols-2 items-center">
                  <div className="relative">
                    <p className="text-muted-foreground mb-10">
                      Quantidade de avaliações criadas X Quantidade de
                      avaliações finalizadas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div
            className={cn(
              'grid grid-col-1 gap-12 w-full h-[60vh] relative',
              ratingScales.length === 2 && 'grid-cols-2',
              ratingScales.length === 3 && 'grid-cols-3',
            )}
          ></div>
        </div>
      )}
    </div>
  )
}

export default Dashboards
