import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { criteriaAssessmentId: string } },
) {
  try {
    const { userId } = auth()
    const { questionNumber, question, answer, step } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const dialog = await db.dialog.findFirst({
      where: {
        assessmentId: params.criteriaAssessmentId,
        questionNumber,
      },
    })

    if (dialog) {
      const newDialog = await db.dialog.update({
        where: {
          id: dialog.id,
        },
        data: {
          answer,
        },
      })
      return NextResponse.json(newDialog)
    } else {
      const newDialog = await db.dialog.create({
        data: {
          assessmentId: params.criteriaAssessmentId,
          questionNumber,
          question,
          answer,
        },
      })

      const criteriaAssessment = await db.criteriaAssessment.findFirst({
        where: {
          id: params.criteriaAssessmentId,
        },
      })

      if (!criteriaAssessment) {
        return new NextResponse('Assessment not exists', { status: 400 })
      } else {
        // let totalProgress = 0
        // if (assessment.ratingScale === 'ELE') {
        //   totalProgress = ELEQuestions.length
        // } else if (assessment.ratingScale === 'ATA') {
        //   totalProgress = ATAQuestions.length
        // } else {
        //   totalProgress = SNAPQuestions.length
        // }

        // const progress = step / totalProgress
        // const percentageProgress = progress * 100

        if (step > criteriaAssessment?.currentStep) {
          await db.criteriaAssessment.update({
            where: {
              id: criteriaAssessment?.id,
            },
            data: {
              currentStep: step,
            },
          })
        }
      }

      return NextResponse.json(newDialog)
    }
  } catch (err) {
    console.log('[CRITERIA_DIALOG]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
