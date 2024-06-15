import { redirect } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './columns'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

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
      Student: {
        include: {
          school: true,
        },
      },
    },
  })

  const formatedAssessment = assessments.map((assessment) => ({
    id: assessment?.id,
    name: assessment?.Student?.name,
    school: assessment?.Student?.school?.name,
    age: assessment?.Student?.age,
    classroom: assessment?.Student?.classroom,
    scaleRating: assessment?.ratingScale,
    status: 'OK',
  }))

  console.log(assessments)

  return (
    <div className="mx-auto mt-10 px-10">
      <h1 className="text-4xl text-slate-900 mb-8">Avaliações</h1>
      <DataTable columns={columns} data={formatedAssessment} />
    </div>
  )
}

export default Assessment
