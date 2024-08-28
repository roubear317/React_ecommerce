import CartContextProvider from '../../Context/CartContext/CartContext'
import style from './Cart.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext/CartContext'
import React, { useContext, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import CartItem from '../CartItem/CartItem'
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../Loading/Loading'
export default function Cart() {
  const{ getUserCart,updateCountItem,deleteItem ,clearCartItem}=useContext(CartContext)
const[cartDetails,setCartDetails]=useState(null)
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

 async function getLoggedUserCart() {
  try {
    const response = await getUserCart();
    console.log('Full response:', response);  

    if (response && response.data) {
      console.log('response.data:', response.data); 

      if (response.data.status === 'success') {
        setCartDetails(response.data.data);
      } else {
        console.error('Error: status is not success');
      }
    } else {
      console.error('Error: response.data is undefined');
    }
  } catch (error) {
    console.error('Error fetching cart details:', error);
  }
  //const response=  await getUserCart();
  // const response = await getUserCart();
  // console.log(response); 
/////////////////////////////////////////////////////////////////////////////////
  // try {
  //   const response = await getUserCart();
  //   console.log(response); 

  //   if (response && response.data && response.data.status === 'success') {
  //     setCartDetails(response.data.data);
  //   } else {
  //     console.error('Error: response.data is undefined or status is not success');
  //   }
  // } catch (error) {
  //   console.error('Error fetching cart details:', error);
  // }
  ////////////////////////////////////////////////////////////////////
//  console.log(response.data.data)
//   if (response.data.status=='success') {
//     setCartDetails(response.data.data)
//   }
  }
  async function updateQun(id,count) {
    try {
      const response = await updateCountItem(id,count);
      console.log('Full response:', response);  
  
      if (response && response.data) {
        console.log('response.data:', response.data); 
       
  
        if (response.data.status === 'success') {
          setCartDetails(response.data.data);
          toast.success('Item Updated.');
        } else {
          console.error('Error: status is not success');
        }
      } else {
        console.error('Error: response.data is undefined');
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }}
  async function deleteItemFromCart(id) {
    try {
      const response = await deleteItem(id);
      console.log('Full response:', response);  
  
      if (response && response.data) {
        console.log('response.data:', response.data); 
  
        if (response.data.status === 'success') {
          setCartDetails(response.data.data);
          toast.success('Item Removed.');
        } else {
          console.error('Error: status is not success');
        }
      } else {
        console.error('Error: response.data is undefined');
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }}
  async function clearItemsFromCart() {
    try {
      const response = await clearCartItem();
      console.log('Full response:', response);  
  
      if (response && response.data) {
        console.log('response.data:', response.data); 
  
        if (response.data.message === 'success') {
          setCartDetails(response.data.data);
          toast.success('Items Cleared.');
        } else {
          console.error('Error: status is not success');
        }
      } else {
        console.error('Error: response.data is undefined');
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }}




    useEffect(() => {
      
      try {
        getLoggedUserCart()
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, [])
    
    if (loading) return <div className="text-center"><Loading/></div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
  return (
   
      

<div className="relative overflow-x-auto  sm:rounded-lg">
  <h2 className='text-green-600 my-3'>Cart Details</h2>
  <div className='flex justify-between mb-3 items-center'>
<p className='h3 text-green-600  '>Total Price {cartDetails?.totalCartPrice}</p>
{/* <button className='text-white bg-green-600 my-2 mx-2 rounded-md'>Clear Cart <FaTrash className='inline-block'/></button> */}
<button onClick={clearItemsFromCart} className="flex items-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 my-2 mx-2 rounded-md px-4 py-2 transition duration-150 ease-in-out">
      <FaTrash className="mr-2" /> Clear Cart
    </button>

  </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
   {
    cartDetails?.products.map(p => <CartItem key={p.id} count={p.count} price={p.price} product={p.product} updateQun={updateQun} deleteItemFromCart={deleteItemFromCart}/>)
   }
    </tbody>
    
  
  </table>
 
  <Link to={"/checkout/" +cartDetails?._id}className="flex w-fit mx-auto justify-center text-center items-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 my-2  rounded-md px-4 py-2 transition duration-150 ease-in-out">Checkout</Link>
 
</div>

    
  )
}
