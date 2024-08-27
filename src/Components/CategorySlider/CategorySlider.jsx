import axios from 'axios';
import style from './CategorySlider.module.css'

import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Loading from '../Loading/Loading';
export default function CategorySlider() {
  const[categories,setCategories]=useState([])
  async function getCategories() {
   // await new Promise(resolve => setTimeout(resolve, 2000));
   const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   console.log(data.data);
   setCategories(data.data)
   
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:3000,
    responsive:[ {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]

  };

    useEffect(() => {
      getCategories()
    }, [])
    if(categories.length===0){
      return <Loading/>
    }
  return (
    <div className='mt-6'>
      <Slider {...settings}>
      {
        categories.map((c)=>{
          return(
<div key={c._id} className='p-2'>
  <img className='h-[200px] w-full object-cover' src={c.image} alt="" />
  <h3 className='text-sm text-green-600 mt-3'>{c.name}</h3>
</div>

         ) })
      }
    </Slider>
    </div>
  )
}
