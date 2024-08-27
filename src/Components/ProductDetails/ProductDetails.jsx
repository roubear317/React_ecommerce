import { useParams } from 'react-router-dom'
import style from './ProductDetails.module.css'

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext/CartContext'
// import Loading from './components/Loading/Loading';
// import Loading from '../../Loading/Loading';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {
  
  const{addItemToCart,setCartItem}=useContext(CartContext)
async function addItem(id) {
  const response= await addItemToCart(id)
  console.log(response.data);
  if (response.data.status=='success') {
    setCartItem(response.data.numOfCartItems)
    toast.success('Item Added To Your Cart.');
} else {
  toast.error('Failed to add item to your cart.');
}
  
}
  const {id} = useParams()

const {data:productDetails,isLoading,error ,isError}= useQuery({
  queryKey: ['productDetails',id],
  queryFn:  () =>  axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id),
    select:  (data)=>data.data.data
})


//   const[productDetails,setPrductDetails] = useState(null)

//  async function getProduct(id) {
//   const {data} =await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id)
// setPrductDetails(data.data)
// }
//     useEffect(() => {
//       getProduct(id)
//     }, [])
    
  return (
    <div>
     
      {isLoading ? <Loading/>:<div className='grid gap-4 sm:grid-cols-12' >
        
        <div className="col-span-4 py-5">
<img src={productDetails?.imageCover} className='w-full' alt="" />


        </div>
        <div className="col-span-8 py-5 self-center">
<h2>{productDetails.title}</h2>
<p className='my-3 font-light'>{productDetails.description}</p>
<h3 className='mb-2'>{productDetails.category.name}</h3>
<div className="flex justify-between mb-3">
<p>{productDetails.price} EGY</p>
<p>{productDetails.ratingsAverage} <FaStar className='text-yellow-400 inline-block'/></p>

</div>
<button onClick={()=>addItem(productDetails.id)} className='w-full   rounded-sm bg-green-600  text-white py-1  ' >add Cart</button>

        </div>
        
        </div>}
    </div>
  )
}
