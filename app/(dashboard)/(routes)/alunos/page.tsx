import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Students = () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  return (
    <div className="w-full h-[80vh] flex justify-center items-center text-5xl">
      Alunos
    </div>
  )
}

export default Students
