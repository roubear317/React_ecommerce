import { Outlet } from 'react-router-dom'
import style from './LayOut.module.css'

import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function LayOut() {
    useEffect(() => {
    
    }, [])
    
  return (
    <>
    <Navbar/>
    
     <div className='container p-3 pt-4 mx-auto max-w-screen-xl'>
    <Outlet/>
  </div>
  <Footer/>
  
  </>
   
  )
}
