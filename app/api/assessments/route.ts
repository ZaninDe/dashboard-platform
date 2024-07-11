import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { studentId, ratingScale } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const assessment = await db.assessment.findFirst({
      where: {
        studentId,
        ratingScale,
      },
    })

    if (assessment) {
      return new NextResponse('Assessment already exists', { status: 400 })
    } else {
      const newAssessment = await db.assessment.create({
        data: {
          userId,
          studentId,
          ratingScale,
          currentStep: 1,
        },
      })

      return NextResponse.json(newAssessment)
    }
  } catch (err) {
    console.log('[ASSESSMENT]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
