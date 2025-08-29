import React from 'react'
import { Button } from '../ui/button';
import {Link} from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col mx-20 items-center gap-9 p-1'>
        <h1 className='font-extrabold text-[60px] text-center mt-16'>
             <span className='text-[#c114d1]'>"Off the Beaten Path"</span> <br /> Discover your journey with us.
        </h1>
        <p className='text-xl mx-20 text-shadow-white text-center'>Where journeys begin and memories never end. Discover handcrafted adventures, local secrets, and seamless travel planning—because the best stories start with "Remember that time in..."</p>

        <Link to = {'/create-trip'}>
        <Button className='text-2xl p-5'>+ Create Trip</Button>
        </Link>
        
     <img src='/Laptop.png' className="w-full h-full object-cover"/>
    </div>
  )
}

export default Hero
