import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
export const CartContext = createContext();


export default function CartContextProvider({children}) {

const token = localStorage.getItem('token')
const headers = {
    token
}
//const headers = { Authorization: `Bearer ${token}` };
function getUserCart(){
   
//return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers}).then(data=>data).catch(err=>err)
return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
.then(response => response)
.catch(err => {
    console.error('Error fetching cart:', err);
    return { data: { status: 'fail', message: 'An error occurred' } };
});
}
function addItemToCart(id){
   
   
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {productId:id},{ headers })
    .then(response => response)
    .catch(err => {
        console.error('Error fetching cart:', err);
        return { data: { status: 'fail', message: 'An error occurred' } };
    });
    }
function updateCountItem(id,count){
   
   
    return axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+id, {count:count},{ headers })
    .then(response => response)
    .catch(err => {
        console.error('Error fetching cart:', err);
        return { data: { status: 'fail', message: 'An error occurred' } };
    });
    }
function deleteItem(id){
   
   
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+id, { headers })
    .then(response => response)
    .catch(err => {
        console.error('Error fetching cart:', err);
        return { data: { status: 'fail', message: 'An error occurred' } };
    });
    }
function clearCartItem(){
   
   
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers })
    .then(response => response)
    .catch(err => {
        console.error('Error fetching cart:', err);
        return { data: { status: 'fail', message: 'An error occurred' } };
    });
    }

    function checkOutSession(id,session){
   
   
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`, {session},{ headers })
        .then(response => response)
        .catch(err => {
            console.error('Error fetching cart:', err);
            return { data: { status: 'fail', message: 'An error occurred' } };
        });
        }






 const[cartItem,setCartItem]  =useState(0)
async function getCart() {
  const response =   await getUserCart()
  if(response.data.status=='success'){
    setCartItem(response.data.numOfCartItems)
  }
}
useEffect(()=>{
    getCart()
},[])
    return <CartContext.Provider value={{getUserCart , addItemToCart,updateCountItem,deleteItem,clearCartItem,cartItem,setCartItem,checkOutSession}}>

        {children}
    </CartContext.Provider>
}

