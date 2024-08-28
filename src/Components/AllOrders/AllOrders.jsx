import axios from 'axios'
import style from './AllOrders.module.css'

import React, { useEffect, useState } from 'react'

export default function AllOrders() {

  const[allOrders,setAllOrders]=useState([])
   function getAllOrders(){
   
   
    return  axios.get('https://ecommerce.routemisr.com/api/v1/orders/')
    .then(response => response)
    .catch(err => {
        console.error('Error fetching cart:', err);
        return { data: { status: 'fail', message: 'An error occurred' } };
    });
    }
async function getOrders() {
  const response = await getAllOrders()
  setAllOrders(response.data.data)
}

    useEffect(() => {
      getOrders()
    }, [])
    
  return (
    <div>
      <h2>AllOrders</h2>
    </div>
  )
}
