import style from './Footer.module.css'

import React, { useEffect } from 'react'

export default function Footer() {
    useEffect(() => {
    
    }, [])
    
  return (
    <footer className="bottom-0 left-0 w-full bg-white text-gray-900 py-4 mt-2 dark:text-white dark:bg-gray-800">
    <div className="container mx-auto text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Roubear Atef Dainel.</p>
      <div className="mt-2">
      <p className="text-sm"> Email :roubear.atef@gmail.com.</p>
      <p className="text-sm"> Number : 01287498754.</p>
      
      </div>
    </div>
  </footer>
  )
}
