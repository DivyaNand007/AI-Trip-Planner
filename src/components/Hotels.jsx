import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
  //  console.log("Trip inside Hotels component:", trip);
  // console.log("Hotels array:", trip?.tripData?.hotels);
  return (
    <div className='my-10 mx-5'>
      <h2 className='text-left font-bold font-serif xs:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl my-3' >Hotel Recommendation:</h2>
      <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-3 gap-5 hover:scale-105 transition-all'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
         
         <HotelCardItem key={index} hotel={hotel} />

        ))}
      </div>
    </div>
  )
}

export default Hotels
