import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Faq = () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  return <div>Faq</div>
}

export default Faq
