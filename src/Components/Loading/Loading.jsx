import style from './Loading.module.css'

import React, { useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
export default function Loading() {
    useEffect(() => {
    
    }, [])
    
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin text-green-600">
      <FaShoppingCart size={200} />
    </div>
  </div>
  )
}
