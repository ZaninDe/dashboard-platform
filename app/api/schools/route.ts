import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { name, address, state, city, neighborhood, region, phone } =
      await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const school = await db.school.findFirst({
      where: {
        name,
      },
    })

    if (school) {
      return new NextResponse('school already exists', { status: 400 })
    } else {
      const newSchool = await db.school.create({
        data: {
          name,
          address,
          state,
          city,
          neighborhood,
          region,
          phone,
          userId,
        },
      })

      return NextResponse.json(newSchool)
    }
  } catch (err) {
    console.log('[SCHOOLS]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
