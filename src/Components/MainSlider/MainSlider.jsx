import style from './MainSlider.module.css'

import Slider from "react-slick";
import React, { useEffect } from 'react'
import img_1 from '../../assets/imgs/main-slider-1.jpeg'
import img_2 from '../../assets/imgs/main-slider-2.jpeg'
import img_3 from '../../assets/imgs/main-slider-3.jpeg'
import img_4 from '../../assets/imgs/slide-1.jpeg'
import img_5 from '../../assets/imgs/slide-2.jpeg'







export default function MainSlider() {


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:3000,
  };



    useEffect(() => {
    
    }, [])
    
  return (
    <div className='grid md:grid-cols-12'>
      <div className='md:col-span-8'>
      <Slider {...settings}>
     <img className='w-full h-[400px] object-cover' src={img_1} alt="" />
     <img className='w-full h-[400px] object-cover' src={img_4} alt="" />
      <img className='w-full h-[400px] object-cover' src={img_5} alt="" />

   
     </Slider>
      </div>
      <div className='md:col-span-4'>
      <img className='w-full h-[200px] object-cover' src={img_2} alt="" />
      <img className='w-full h-[200px] object-cover' src={img_3} alt="" />
      </div>


    </div>
   
  )
}
