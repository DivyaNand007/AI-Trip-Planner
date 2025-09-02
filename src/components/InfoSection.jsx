import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { IoMdSend } from "react-icons/io";
import { GetPlaceDetails } from '../service/GlobalApi.jsx'

function InfoSection({ trip }) {  //Receives data via props

  const [PhotoUrl, SetPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();

      // Optional: Update photo if screen is resized
      const handleResize = () => {
        GetPlacePhoto();
      };
      window.addEventListener("resize", handleResize); //window is a global obj, and resize is a predefined event belong to windows object

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    };

    try {
      const resp = await GetPlaceDetails(data);
      console.log("yaha aiga photos collection:", resp.data);

      const photoName = resp.data?.places[0]?.photos[1]?.name;
      // console.log("Photo ka detail:", photoName);

      if (photoName) {
        const screenWidth = window.innerWidth;
        //  Only use maxWidthPx, Google will auto-adjust height
        const Photo = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${screenWidth}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

        console.log("Final Photo URL(infoSection):", Photo);
        SetPhotoUrl(Photo);
      }

    } catch (error) {
      console.log("Photo nahi mila", error);
    }
  };

  return (
    <div>
      {/* Image */}
      <img
        src={PhotoUrl ? PhotoUrl : "../placeholder.jpg"}
        className="w-full h-[600px] object-cover rounded-2xl shadow-xl"
        alt="Trip location"
      />

      {/* Info Section */}
      <div className='m-5 mt-10 flex flex-col gap-5'>
        <h2 className='text-left text-2xl font-bold flex gap-5'>
          {trip?.userSelection?.location?.label}
          <Button className="flex items-center py-4 hover:bg-gray-600">
            <IoMdSend />
          </Button>
        </h2>

        <div className='flex gap-5 flex-wrap'>
          <h2 className='text-left py-2 px-4 pr-5 text-lg font-bold bg-gray-300 rounded-full text-gray-600 xs:text-xs md:text-md lg:text-lg xl:text-xl 2xl:text-2xl'>
            📅 {trip?.userSelection?.noOfDays} Day
          </h2>
          <h2 className='text-left py-2 px-4 pr-5 text-lg font-bold bg-gray-300 rounded-full text-gray-600 xs:text-xs md:text-md lg:text-lg xl:text-xl 2xl:text-2xl'>
            🧍🏻 No. of Traveller: {trip?.userSelection?.travelList}
          </h2>
          <h2 className='text-left py-2 px-4 pr-5 text-lg font-bold bg-gray-300 rounded-full text-gray-600 xs:text-xs md:text-md lg:text-lg xl:text-xl 2xl:text-2xl'>
            🪙 Budget: {trip?.userSelection?.budget}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
