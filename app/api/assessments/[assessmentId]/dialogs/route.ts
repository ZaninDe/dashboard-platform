import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { assessmentId: string } },
) {
  try {
    const { userId } = auth()
    const { questionNumber, question, answer, step } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const dialog = await db.dialog.findFirst({
      where: {
        assessmentId: params.assessmentId,
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
          assessmentId: params.assessmentId,
          questionNumber,
          question,
          answer,
        },
      })

      const assessment = await db.assessment.findFirst({
        where: {
          id: params.assessmentId,
        },
      })

      if (!assessment) {
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

        if (step > assessment?.currentStep) {
          await db.assessment.update({
            where: {
              id: assessment?.id,
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
    console.log('[DIALOG]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
