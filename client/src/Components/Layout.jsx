import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children, title, description}) => {
  return (
    <div>
      <Navbar/>
      <main className=''>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout