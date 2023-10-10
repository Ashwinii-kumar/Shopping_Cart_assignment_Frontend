import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className='bg-slate-700 border-green-700  min-w-[100vw]'>
    <Header/>

    <div >
      <Outlet/>
    </div>
     
      <Footer/>
    </div>
  )
}

export default MainLayout