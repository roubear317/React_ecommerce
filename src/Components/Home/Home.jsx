import axios from 'axios'
import style from './Home.module.css'

import React, { useEffect, useState } from 'react'
/*import RecentProduct from '../RecentProduct/RecentProduct'*/
import Loading from '../Loading/Loading'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'

export default function Home() {
  
//  const [data,setData] = useState([])

//  async function getProduct(){
// const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
// console.log(data.data);

// setData(data.data)
//  }



    useEffect(() => {
      // getProduct()
   

    }, [])
    
  return (
    <div>
     <MainSlider/>
      {/* <CategorySlider/> */}
  <CategorySlider/>




    <Products/>
      {/* <RecentProduct/> */}
     {/* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
{data.length==0 ? <>Loading....</>: data.map((p)=>{
  return<>
  <div className="group">

<img src={p.imageCover} alt="Cover" />
<h3 className='text-green-600 my-3'>{p.title.split(' ').slice(0,2).join(' ')}</h3>
<p className='line-clamp-3 mb-2'>{p.description}</p>
<button className='w-full  translate-y-full  group-hover:translate-y-0 group-hover:opacity-100 opacity-0 rounded-md bg-green-500  text-white py-2 duration-500 transition-all ' >add Cart</button>


  </div>

  </>

})}

     </div> */}
    </div>
  )
}
