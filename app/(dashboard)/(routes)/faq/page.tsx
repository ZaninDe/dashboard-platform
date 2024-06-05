import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Faq = () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  return (
    <div className="w-full h-[80vh] flex justify-center items-center text-5xl">
      FAQ
    </div>
  )
}

export default Faq
