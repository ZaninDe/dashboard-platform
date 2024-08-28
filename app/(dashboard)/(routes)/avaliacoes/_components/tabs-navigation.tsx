'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Assessment,
  CriteriaAssessment,
  Dialog,
  School,
  Student,
} from '@prisma/client'
import Answers from './answers'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
// import html2pdf from 'html2pdf.js'
import { ArrowLeftIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

import Dashboard from './dashboard'
import html2pdf from 'html2pdf.js'

export interface StudentSchool extends Student {
  school: School
}

export interface AssesmentUser extends Assessment {
  student: StudentSchool
}

interface TabsNavigationProps {
  assessment: AssesmentUser
  criteriaAssessment: CriteriaAssessment | null
  assessments: Assessment[]
  dialogs: Dialog[]
  criteriaDialogs: Dialog[]
}

export function TabsNavigation({
  assessment,
  assessments,
  criteriaAssessment,
  criteriaDialogs,
  dialogs,
}: TabsNavigationProps) {
  const router = useRouter()
  const reportRef = useRef<HTMLDivElement>(null)

  const generatePDF = () => {
    if (reportRef.current) {
      html2pdf()
        .from(reportRef.current)
        .save(`${assessment?.student?.name}_${assessment?.student?.ra}.pdf`)
    }
  }

  const handleBack = () => {
    router.back()
  }
  return (
    <div className="mb-40">
      <Button
        variant="link"
        className="flex gap-2 md:absolute mt-4 md:mt-0"
        onClick={handleBack}
      >
        <ArrowLeftIcon className="text-black" />
        Voltar
      </Button>
      <Tabs defaultValue="dashboard" className="w-full mt-2 md:mt-10">
        <TabsList className="grid grid-cols-2 md:w-[400px] mx-auto">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="answers">Espelho</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Card className="px-0 md:px-10">
            <CardHeader></CardHeader>
            <CardContent>
              <Dashboard
                assessment={assessment}
                assessments={assessments}
                dialogs={dialogs}
                criteriaDialogs={criteriaDialogs}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="answers">
          <Card className="">
            <CardHeader className="p-2 md:py-6">
              <CardTitle>Espelho de Avaliação</CardTitle>
              <div className="md:flex w-full items-center justify-between space-y-4 md:space-y-0">
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
            <CardContent className="p-2 space-y-2" ref={reportRef}>
              <Answers
                dialogs={dialogs}
                assessment={assessment}
                criteriaAssessment={criteriaAssessment}
                criteriaDialogs={criteriaDialogs}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
