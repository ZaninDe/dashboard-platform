import NavBar from './_components/navbar'
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <NavBar />
      {children}
    </main>
  )
}

export default DashboardLayout
