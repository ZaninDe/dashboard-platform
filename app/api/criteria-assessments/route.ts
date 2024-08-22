import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { studentId, ratingScale, assessmentId } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const assessment = await db.criteriaAssessment.findFirst({
      where: {
        studentId,
        ratingScale,
      },
    })

    if (assessment) {
      return new NextResponse('Criteria assessment already exists', {
        status: 400,
      })
    } else {
      const newCriteriaAssessment = await db.criteriaAssessment.create({
        data: {
          userId,
          assessmentId,
          studentId,
          ratingScale,
          currentStep: 1,
        },
      })

      return NextResponse.json(newCriteriaAssessment)
    }
  } catch (err) {
    console.log('[CRITERIA_ASSESSMENT]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
