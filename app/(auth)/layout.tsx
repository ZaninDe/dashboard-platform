const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-cyan-700/80 flex items-center justify-center">
      {children}
    </div>
  )
}

export default AuthLayout
