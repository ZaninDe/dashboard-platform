import { db } from '@/lib/db'

export const getSchools = async () => {
  try {
    const schools = await db.school.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return schools
  } catch (err) {
    console.log('[GET_SCHOOLS]', err)
  }
}
