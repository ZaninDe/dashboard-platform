import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { assessmentId: string } },
) {
  try {
    const { userId } = auth()
    const { sum } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const assessment = await db.assessment.findFirst({
      where: {
        id: params.assessmentId,
      },
    })

    if (!assessment) {
      return new NextResponse('Assessment not exists', { status: 400 })
    } else {
      const newAssessment = await db.assessment.update({
        where: {
          id: params.assessmentId,
        },
        data: {
          resultAmount: sum,
        },
      })

      return NextResponse.json(newAssessment)
    }
  } catch (err) {
    console.log('[ASSESSMENT_FINISH]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
