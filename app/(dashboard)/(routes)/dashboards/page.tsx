import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Dashboards from './_components/dashboards'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const DashboardsPage = async () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  const assessments = await db.assessment.findMany({
    include: {
      student: {
        include: {
          school: true,
        },
      },
      dialog: true,
    },
  })
  return (
    <div className="min-h-screen p-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Apresentação de Resultados Gerais</CardTitle>
          <CardDescription>
            Expore os filtros para uma análise completa e personalizada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dashboards assessments={assessments} />
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardsPage
