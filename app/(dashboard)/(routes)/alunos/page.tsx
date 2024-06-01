import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Students = () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  return <div>Students</div>
}

export default Students
