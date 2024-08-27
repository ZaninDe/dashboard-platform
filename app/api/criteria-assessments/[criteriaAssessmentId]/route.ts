/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { criteriaAssessmentId: string } },
) {
  try {
    const { userId } = auth()
    const { observation } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const criteriaAssessment = await db.criteriaAssessment.findFirst({
      where: {
        id: params.criteriaAssessmentId,
      },
    })

    if (!criteriaAssessment) {
      return new NextResponse('Assessment not exists', { status: 400 })
    }

    const updatedCriteriaAssessment = await db.criteriaAssessment.update({
      where: {
        id: params.criteriaAssessmentId,
      },
      data: {
        observation,
      },
    })

    return NextResponse.json(updatedCriteriaAssessment)
  } catch (err) {
    console.log('[ASSESSMENT_FINISH]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
