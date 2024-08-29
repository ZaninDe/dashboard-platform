import { db } from '@/lib/db'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CriteriaForm from './_components/criteria-form'

const CriteriaAssesmentIdPage = async ({
  params,
}: {
  params: { criteriaAssessmentId: string }
}) => {
  const criteriaAssessment = await db.criteriaAssessment.findUnique({
    where: {
      id: params.criteriaAssessmentId,
    },
  })

  const dialogs = await db.dialog.findMany({
    where: {
      assessmentId: criteriaAssessment?.id,
    },
    orderBy: {
      questionNumber: 'asc',
    },
  })

  return (
    <div className="w-full h-[130vh] md:h-screen">
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
          'absolute inset-0 md:m-auto mt-40 mx-4 md:w-1/2 h-1/2 bg-white rounded-lg',
          criteriaAssessment?.ratingScale === 'ATA' && 'h-[70%]',
        )}
      >
        {criteriaAssessment && (
          <div className="h-full">
            <CriteriaForm
              criteriaAssessment={criteriaAssessment}
              dialogs={dialogs}
            />
          </div>
        )}
      </div>
      <div className="h-[60%] bg-cyan-600 flex justify-center items-end">
        <h1 className="mb-32 p-4 md:mb-10 text-2xl md:text-5xl font-bold text-white">
          Questionário Critério de Diagnostico
          <span className="text-yellow-400">.</span>
        </h1>
      </div>
    </div>
  )
}

export default CriteriaAssesmentIdPage
