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
    <section className="min-h-screen py-20 space-y-4">
      {dialogs.map((dialog: Dialog) => (
        <div key={dialog.id} className=" pl-4">
          <strong>{dialog?.question} :</strong>
          <p className="font-light">{JSON.stringify(dialog.answer)}</p>
        </div>
      ))}
    </section>
  )
}

export default AssessmentPage
