import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { name, ra, age, schoolId, classroom } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const student = await db.student.findFirst({
      where: {
        ra,
      },
    })

    if (student) {
      return new NextResponse('student already exists', { status: 400 })
    } else {
      const newStudent = await db.student.create({
        data: {
          name,
          ra,
          age: parseInt(age),
          schoolId,
          classroom,
          userId,
        },
      })

      return NextResponse.json(newStudent)
    }
  } catch (err) {
    console.log('[STUDENTS]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
