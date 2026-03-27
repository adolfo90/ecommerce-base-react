import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col items-center pt-20 md:pt-24 pb-8'>
      {children}
    </div>
  )
}

export default Layout
