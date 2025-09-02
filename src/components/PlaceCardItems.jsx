import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '../service/GlobalApi';

function PlaceCardItems({ places }) {
  const [PhotoUrl, SetPhotoUrl] = useState();

  useEffect(()=>{
    places&&GetPlacePhoto();
  },[places])

  const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=${window.innerWidth}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

  const GetPlacePhoto= async()=>{
    const data = {
      textQuery:places.placeName
    }
    const result = await GetPlaceDetails(data)
    .then(resp=>{
      // console.log("Iterenary k according places",resp.data)
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name);
      SetPhotoUrl(PhotoUrl);
    })

  }
  

return (
  <div className='border rounded-xl p-5'>
    <Link to={'https://www.google.com/maps/search/?api=1&query=+places.placeName'}>
      <>
        <img  src={PhotoUrl ? PhotoUrl : "../placeholder.jpg"}
          className="rounded-xl shadow-xl w-[300px] h-[200px] object-cover" mb-12
        />
        <h2 className='text-red-600 font-bold text-m'>{places?.placeName}:</h2>
        <h2 className='text-sm text-green-700 '>🪙{places?.ticketPricing}</h2>
        <h2 className='text-sm '>🕘{places?.timeToVisit}</h2>
        <h2 className='text-sm text-gray-500'>✒{places?.placeDetails}</h2>
      </>

    </Link>
  </div>


)
};

export default PlaceCardItems
