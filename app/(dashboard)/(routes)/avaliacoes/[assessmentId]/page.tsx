import { db } from '@/lib/db'
import { TabsNavigation } from '../_components/tabs-navigation'
import { auth, clerkClient } from '@clerk/nextjs/server'
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
        />
      )}
    </section>
  )
}

export default AssessmentPage
