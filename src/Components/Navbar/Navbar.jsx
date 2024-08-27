import style from './Navbar.module.css'

import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/imgs/logo.svg'
import { FaFacebook, FaLinkedin, FaShoppingCart, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MdDarkMode,MdOutlineDarkMode } from "react-icons/md";

import UserContextProvider, { UserContext } from "../../Context/UserContext/UserContext";
import { CartContext } from '../../Context/CartContext/CartContext'
import CartItem from '../CartItem/CartItem'



export default function Navbar() {
  const{cartItem}=useContext(CartContext)
  const {token ,setToken}=useContext(UserContext)
  const navigate = useNavigate();
  function logOut(){
    setToken(null);
    navigate('/Login')
  }  
  return (
    <div>
     
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center gap-5  mx-auto p-4">
    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-8" alt=" Logo" />
     
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center ms-auto p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className="hidden w-full grow lg:flex justify-between lg:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
       {token && <> <li>
          <Link to="" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Home</Link>
        </li>
        <li>
          <Link to="Products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Products</Link>
        </li>
        <li>
          <Link to="Categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Categories</Link>
        </li>
        <li>
          <Link to="Brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Brands</Link>
        </li>
        <li>
          <Link to="Cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Cart</Link>
        </li>
        <li>
          <Link to="wishlist" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Wish List</Link>
        </li>
        
        
        
        
        
        </>}
       
      </ul>
      <ul className="font-medium flex flex-col items-center p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
       {!token &&<> <li>
          <Link to="Login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Login</Link>
        </li>
        <li>
          <Link to="Register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Register</Link>
        </li></> }
       {token && <>  <li onClick={logOut}>
          <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">SignOut</span>
        </li>
        <li >
         
         
          <span className="block py-2 px-3 relative text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"> 
            <FaShoppingCart className=''/>
          <span className='absolute top-0 right-0 translate-x-3/4   -translate-y-1/2'>{cartItem}</span>
          </span>
        </li>
        
        
        </>}
      
        <li>
          <ToggleMode/>
        </li>
        <li className='flex gap-4'>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaFacebook/></a>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaTiktok/></a>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaYoutube/></a>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaTwitter/></a>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaLinkedin/></a>
         
        </li>
       
      </ul>
    </div>
  </div>
</nav>


    </div>
  )
}
function ToggleMode(){

  const [isDarkMode,setisDarkMode]=useState(localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
  useEffect(() => {
    const html = document.querySelector('html')
    if(isDarkMode){
      html.classList.add('dark')
    }else{
      html.classList.remove('dark')
    }
    }, [isDarkMode])
  return <>
  <button onClick={()=>setisDarkMode(!isDarkMode)}>{isDarkMode ? <MdDarkMode className='text-white'/> :<MdOutlineDarkMode />}</button>
  </>
  
}