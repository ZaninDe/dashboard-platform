'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Assessment, Dialog, School, Student } from '@prisma/client'
import Answers from './answers'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import html2pdf from 'html2pdf.js'
import { File } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export interface StudentSchool extends Student {
  school: School
}

export interface AssesmentUser extends Assessment {
  student: StudentSchool
}

interface TabsNavigationProps {
  assessment: AssesmentUser
  dialogs: Dialog[]
}

export function TabsNavigation({ assessment, dialogs }: TabsNavigationProps) {
  const router = useRouter()
  const reportRef = useRef<HTMLDivElement>(null)

  const generatePDF = () => {
    if (reportRef.current) {
      html2pdf()
        .from(reportRef.current)
        .save(`${assessment?.student?.name}_${assessment?.student?.ra}.pdf`)
    }
  }
  return (
    <Tabs defaultValue="answers" className="w-full mt-10">
      <TabsList className="grid grid-cols-2 w-[400px] mx-auto">
        <TabsTrigger value="answers">Espelho</TabsTrigger>
        <TabsTrigger value="password">Dashboard</TabsTrigger>
      </TabsList>
      <TabsContent value="answers">
        <Card>
          <CardHeader className="">
            <CardTitle>Espelho de Avaliação</CardTitle>
            <div className="flex w-full items-center justify-between">
              <CardDescription>
                Aqui são apresentadas as respostas durante o preenchimento da
                avaliação
              </CardDescription>
              <Button
                onClick={generatePDF}
                className="flex items-center justify-center gap-2"
              >
                Exportar Relatório
                <File />
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-2" ref={reportRef}>
            <Answers dialogs={dialogs} assessment={assessment} />
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.back()}>Voltar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.back()}>Voltar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
