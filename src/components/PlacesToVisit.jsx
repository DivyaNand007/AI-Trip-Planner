import React, { useEffect, useState } from 'react'
import PlaceCardItems from './PlaceCardItems'
import { MdDateRange } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '../service/GlobalApi';


function PlacesToVisit({trip}) {

  return (
    <div>
      <h2 className='text-left font-bold font-serif xs:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl my-3'>Places to visit:</h2>

      <div className='flex flex-col gap-5'>
        {trip?.tripData?.itinerary?.map((item, index)=>(
          <div key={index} className='border rounded-xl p-5'>
              <h2 className='font-bold text-lg text-blue-600 text-left font-serif' > <MdDateRange className='inline'/> Day: {item?.day}</h2>
              {item.places.map((places,index)=>(
                <div key={index} className=' text-left my-6 border rounded-xl shadow-xl hover:scale-105 transition-all
                 '>
                  <PlaceCardItems  places={places}/>
                 
                </div>
              ))}

          </div>
        ))}
  
      </div>
    </div>
  )
}

export default PlacesToVisit
