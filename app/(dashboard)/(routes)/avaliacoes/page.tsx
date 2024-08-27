import { redirect } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './columns'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { ATAQuestions, SNAPQuestions } from '@/const/rating-scales'
import {
  TDAHDiagnosticQuestions,
  TEADiagnosticQuestions,
} from '@/const/diagnostic-criteria'

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
  const criteriaAssessments = await db.criteriaAssessment.findMany({
    where: {
      userId,
    },
  })

  const formatedAssessment = assessments.map((assessment) => {
    let totalProgress = 0
    if (assessment.ratingScale === 'ATA') {
      totalProgress = ATAQuestions.length
    } else {
      totalProgress = SNAPQuestions.length
    }

    const criteriaAssessment = criteriaAssessments.find(
      (criteriaAssessment) => criteriaAssessment.assessmentId === assessment.id,
    )

    let criteriaTotalProgress = 0
    let criteriaProgress = 0
    if (criteriaAssessment) {
      if (criteriaAssessment.ratingScale === 'ATA') {
        criteriaTotalProgress = TEADiagnosticQuestions.length
      } else {
        criteriaTotalProgress = TDAHDiagnosticQuestions.length
      }

      criteriaProgress =
        criteriaAssessment?.currentStep === 1
          ? 0
          : (criteriaAssessment?.currentStep / criteriaTotalProgress) * 100
    }

    const progress = assessment?.currentStep / totalProgress
    const percentageProgress =
      assessment?.currentStep === 1 ? 0 : progress * 100
    return {
      id: assessment?.id,
      name: assessment?.student?.name,
      school: assessment?.student?.school?.name,
      age: assessment?.student?.age,
      classroom: assessment?.student?.classroom,
      scaleRating: assessment?.ratingScale,
      criteriaProgress,
      progress: percentageProgress,
    }
  })

  return (
    <div className="mx-auto mt-10 md:px-10 mb-[180px]">
      <h1 className="text-4xl text-slate-900 mb-8 px-4">Avaliações</h1>
      <DataTable columns={columns} data={formatedAssessment} />
    </div>
  )
}

export default Assessment
