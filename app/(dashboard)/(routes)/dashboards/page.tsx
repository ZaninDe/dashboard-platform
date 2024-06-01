import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Dashboards = () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  return <div>Dashboards</div>
}

export default Dashboards
