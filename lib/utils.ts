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
