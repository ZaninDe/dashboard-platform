import { db } from '@/lib/db'
import AssessmentForm from './_components/assessment-form'
import ATAAssessmentForm from './_components/ata-assessment-form'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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
    <div className="w-full h-screen">
      <div className="h-[40%] w-full bg-cyan-200 p-4">
        <Link
          href="/avaliacoes"
          className="flex items-center gap-2 hover:border-b border-black/50 hover:opacity-70 w-48"
        >
          <ArrowLeft />
          Voltar para Avaliações
        </Link>
      </div>
      <div
        className={cn(
          'absolute inset-0 m-auto w-1/2 h-1/2 bg-white rounded-lg',
          assessment?.ratingScale === 'ATA' && 'h-[70%]',
        )}
      >
        {assessment && (
          <div className="h-full relative">
            {assessment.ratingScale !== 'ATA' ? (
              <AssessmentForm assessment={assessment} dialogs={dialogs} />
            ) : (
              <ATAAssessmentForm assessment={assessment} dialogs={dialogs} />
            )}
          </div>
        )}
      </div>
      <div className="h-[60%] bg-cyan-600 flex justify-center items-end">
        <h1 className="mb-10 text-5xl font-bold text-white">
          Questionário<span className="text-yellow-400">.</span>
        </h1>
      </div>
    </div>
  )
}

export default AssesmentIdPage
