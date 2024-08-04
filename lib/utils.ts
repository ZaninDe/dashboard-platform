import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  return format(date, "dd/MM/yy 'às' HH:mm", { locale: ptBR })
}

export function calculateMean(values: (number | null)[]): number {
  const validValues = values.filter((value): value is number => value !== null)
  const sum = validValues.reduce((acc, value) => acc + value, 0)
  return validValues.length ? sum / validValues.length : 0
}

export function calculateMode(values: (number | null)[]): number | null {
  const frequency: { [key: number]: number } = {}
  let maxFrequency = 0
  let mode: number | null = null

  values.forEach((value) => {
    if (value !== null) {
      frequency[value] = (frequency[value] || 0) + 1
      if (frequency[value] > maxFrequency) {
        maxFrequency = frequency[value]
        mode = value
      }
    }
  })

  return mode
}

export function calculateMedian(values: (number | null)[]): number {
  const validValues = values.filter((value): value is number => value !== null)
  validValues.sort((a, b) => a - b)
  const mid = Math.floor(validValues.length / 2)

  if (validValues.length % 2 === 0) {
    return (validValues[mid - 1] + validValues[mid]) / 2
  } else {
    return validValues[mid]
  }
}

export const countNumbersAndNulls = (arr: (number | null)[]) => {
  let numberCount = 0
  // let nullCount = 0
  let total = 0

  console.log(arr)
  console.log(arr.length)

  arr.forEach((item) => {
    total++
    if (item === null) {
      // nullCount++
    } else {
      numberCount++
    }
  })

  const percentage = (numberCount / total) * 100
  return percentage

  // return { numberCount, nullCount }
}
