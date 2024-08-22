/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db'
import { snapivIndicatorCheck } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { criteriaAssessmentId: string } },
) {
  try {
    const { userId } = auth()
    const { sum } = await req.json()

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
    } else {
      const dialogs = await db.dialog.findMany({
        where: {
          assessmentId: params.criteriaAssessmentId,
        },
      })

      const data = {} as any
      if (criteriaAssessment.ratingScale === 'SnapIV') {
        const hyperactivity = snapivIndicatorCheck(dialogs.slice(0, 8))
        const inattention = snapivIndicatorCheck(dialogs.slice(9, 17))

        data.hyperactivity = hyperactivity
        data.inattention = inattention
      }

      let count = 0
      if (criteriaAssessment.ratingScale === 'ATA') {
        dialogs.forEach((dialog) => {
          const answerAmount = JSON.stringify(dialog.answer).length
          // console.log('RESPOSTAS: ', JSON.stringify(dialog.answer))
          // console.log(
          //   'quantidade de respostas: ',
          //   JSON.stringify(dialog.answer).length,
          // )
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

      if (criteriaAssessment.ratingScale === 'ATA') {
        data.resultAmount = count
      } else {
        data.resultAmount = sum
      }

      const newAssessment = await db.assessment.update({
        where: {
          id: params.criteriaAssessmentId,
        },
        data,
      })

      return NextResponse.json(newAssessment)
    }
  } catch (err) {
    console.log('[ASSESSMENT_FINISH]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
