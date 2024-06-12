import { db } from '@/lib/db'
import { Dialog } from '@prisma/client'

const AssessmentPage = async ({
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
    <div>
      {dialogs.map((dialog: Dialog) => (
        <div key={dialog.id} className="space-y-4 pl-4">
          <strong>{dialog?.question} :</strong>
          <p className="font-light">{dialog.answer}</p>
        </div>
      ))}
    </div>
  )
}

export default AssessmentPage
