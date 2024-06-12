import { db } from '@/lib/db'
import AssessmentForm from './_components/assessment-form'

const AssesmentIdPage = async ({
  params,
}: {
  params: { assessmentId: string }
}) => {
  const assessment = await db.assessment.findUnique({
    where: {
      id: params.assessmentId,
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
    <div className="w-full h-[calc(100vh-87px)]">
      <div className="h-[40%] w-full bg-cyan-200"></div>
      <div className="absolute inset-0 m-auto w-1/2 h-1/2 bg-white rounded-lg">
        {assessment && (
          <AssessmentForm assessment={assessment} dialogs={dialogs} />
        )}
      </div>
      <div className="h-[60%] bg-cyan-600 flex justify-center items-end">
        <h1 className="mb-20 text-5xl font-bold text-white">
          Questionário<span className="text-yellow-400">.</span>
        </h1>
      </div>
    </div>
  )
}

export default AssesmentIdPage
