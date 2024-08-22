import { redirect } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './columns'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { ATAQuestions, SNAPQuestions } from '@/const/rating-scales'

const Assessment = async () => {
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
    },
  })

  const formatedAssessment = assessments.map((assessment) => {
    let totalProgress = 0
    if (assessment.ratingScale === 'ATA') {
      totalProgress = ATAQuestions.length
    } else {
      totalProgress = SNAPQuestions.length
    }

    const progress = assessment?.currentStep / totalProgress
    const percentageProgress = progress * 100
    return {
      id: assessment?.id,
      name: assessment?.student?.name,
      school: assessment?.student?.school?.name,
      age: assessment?.student?.age,
      classroom: assessment?.student?.classroom,
      scaleRating: assessment?.ratingScale,
      status: 'OK',
      progress: percentageProgress,
    }
  })

  return (
    <div className="mx-auto mt-10 px-10 mb-[180px]">
      <h1 className="text-4xl text-slate-900 mb-8">Avaliações</h1>
      <DataTable columns={columns} data={formatedAssessment} />
    </div>
  )
}

export default Assessment
