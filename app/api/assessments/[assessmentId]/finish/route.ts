/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db'
import { snapivIndicatorCheck } from '@/lib/utils'
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
      const dialogs = await db.dialog.findMany({
        where: {
          assessmentId: params.assessmentId,
        },
      })

      const data = {} as any
      if (assessment.ratingScale === 'SnapIV') {
        const hyperactivity = snapivIndicatorCheck(dialogs.slice(0, 8))
        const inattention = snapivIndicatorCheck(dialogs.slice(9, 17))

        data.hyperactivity = hyperactivity
        data.inattention = inattention
      }

      let count = 0
      if (assessment.ratingScale === 'ATA') {
        dialogs.forEach((dialog) => {
          const answerAmount = JSON.stringify(dialog.answer).length
          console.log('RESPOSTAS: ', JSON.stringify(dialog.answer))
          console.log(
            'quantidade de respostas: ',
            JSON.stringify(dialog.answer).length,
          )
          if (dialog.questionNumber === 23) {
            if (JSON.stringify(dialog.answer).includes('2')) {
              count = count + 2
            }
          } else if (answerAmount >= 5) {
            count = count + 2
          } else if (answerAmount >= 3) {
            count++
          }
        })
      }

      if (assessment.ratingScale === 'ATA') {
        data.resultAmount = count
      } else {
        data.resultAmount = sum
      }

      const newAssessment = await db.assessment.update({
        where: {
          id: params.assessmentId,
        },
        data,
      })

      if (assessment?.ratingScale) {
        const newCriteriaAssessment = await db.criteriaAssessment.create({
          data: {
            currentStep: 0,
            assessmentId: assessment.id,
            ratingScale: assessment?.ratingScale,
            userId: assessment.userId,
            studentId: assessment.studentId,
          },
        })

        return NextResponse.json(newCriteriaAssessment)
      }

      return NextResponse.json(newAssessment)
    }
  } catch (err) {
    console.log('[ASSESSMENT_FINISH]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
