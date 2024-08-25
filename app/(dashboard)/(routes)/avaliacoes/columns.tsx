'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { RatingScale } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface AssessmentProps {
  id: string
  name: string
  school: string
  age: number
  classroom: string
  scaleRating: RatingScale
  criteriaProgress: number
  progress: number
}

export const columns: ColumnDef<AssessmentProps>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hidden"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID da Avaliação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: () => {
      return <div className="hidden"></div>
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Aluno
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'school',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Escola
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'age',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Idade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'classroom',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ano Escolar
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'scaleRating',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Escala
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'progress',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Escala de Avaliação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const progress: number = row.getValue('progress')

      return (
        <div className="flex items-center gap-2">
          <p
            className={cn(
              'text-xs w-9 text-end text-cyan-700/80',
              progress !== 100 && 'text-red-700',
            )}
          >{`${Math.floor(progress)}%`}</p>
          <Progress value={progress} />
        </div>
      )
    },
  },
  {
    accessorKey: 'criteriaProgress',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Critério de Diagnóstico
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const progress: number = row.getValue('criteriaProgress')

      return (
        <div className="flex items-center gap-2">
          <p
            className={cn(
              'text-xs w-9 text-end text-cyan-700/80',
              progress !== 100 && 'text-red-700',
            )}
          >{`${Math.floor(progress)}%`}</p>
          <Progress value={progress} />
        </div>
      )
    },
  },
]
