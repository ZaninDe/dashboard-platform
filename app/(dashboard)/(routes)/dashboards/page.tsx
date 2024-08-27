import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import StudentDashboard from './_components/student-dashboard'

const DashboardsPage = async () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  const assessments = await db.assessment.findMany({
    where: {
      userId,
    },
    include: {
      student: {
        include: {
          school: true,
        },
      },
      dialog: true,
    },
  })

  const criteriaAssessments = await db.criteriaAssessment.findMany({
    where: {
      userId,
    },
    include: {
      student: {
        include: {
          school: true,
        },
      },
      dialog: true,
    },
  })

  const students = await db.student.findMany({
    where: {
      userId,
    },
  })

  return (
    <div className="min-h-screen p-4 mb-40">
      <StudentDashboard criteriaAssessments={criteriaAssessments} assessments={assessments} students={students} />
    </div>
  )
}

export default DashboardsPage
