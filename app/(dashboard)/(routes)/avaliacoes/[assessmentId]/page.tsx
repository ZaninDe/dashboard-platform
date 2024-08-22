import { db } from '@/lib/db'
import { TabsNavigation } from '../_components/tabs-navigation'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
const AssessmentPage = async ({
  params,
}: {
  params: { assessmentId: string }
}) => {
  const { userId } = auth()
  if (!userId) {
    return
  }
  const user = await clerkClient.users.getUser(userId)

  const assessment = await db.assessment.findUnique({
    where: {
      id: params.assessmentId,
    },
    include: {
      student: {
        include: {
          school: true,
        },
      },
    },
  })

  if (!assessment) {
    return null
  }

  const criteriaAssessment = await db.criteriaAssessment.findFirst({
    where: {
      assessmentId: assessment.id,
    },
  })

  if (criteriaAssessment) {
    const total = criteriaAssessment.ratingScale === 'ATA' ? 10 : 22
    if (criteriaAssessment.currentStep < total) {
      return redirect(
        `/avaliacoes/nova/criterio-de-diagnostico/${criteriaAssessment.id}`,
      )
    }
  }

  const criteriaDialogs = await db.dialog.findMany({
    where: {
      assessmentId: criteriaAssessment?.id,
    },
  })

  const assessments = await db.assessment.findMany({
    where: {
      ratingScale: assessment?.ratingScale,
    },
  })

  const dialogs = await db.dialog.findMany({
    where: {
      assessmentId: assessment?.id,
    },
    orderBy: {
      questionNumber: 'asc',
    },
  })
  return (
    <section className="min-h-screen px-4">
      {assessment && user && (
        <TabsNavigation
          dialogs={dialogs}
          assessment={assessment}
          assessments={assessments}
          criteriaAssessment={criteriaAssessment}
          criteriaDialogs={criteriaDialogs}
        />
      )}
    </section>
  )
}

export default AssessmentPage
