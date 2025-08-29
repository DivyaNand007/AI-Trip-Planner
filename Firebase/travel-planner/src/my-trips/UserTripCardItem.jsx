import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '../service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
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
    <Link to={'/view-trip/' + trip?.id}>
    <div className='bg-white rounded-xl shadow-xl hover:scale-105 transition-all flex flex-col h-full p-4'>
      <img
        src={PhotoUrl ? PhotoUrl : "/placeholder.jpg"}
        className="rounded-xl w-full aspect-video object-cover mb-4"
      />
      <div className="flex-1">
        <h2 className='font-bold text-lg mt-2 text-left'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-gray-500 text-sm text-left'>📅 No of Days: {trip?.userSelection?.noOfDays}</h2>
        <h2 className='text-gray-500 text-sm text-left'>
          🧍🏻 No. of Traveller:{" "}
          {typeof trip?.userSelection?.travelList === "string" // Ternary operator
            ? trip.userSelection.travelList // if string → render directly
            : trip?.userSelection?.travelList?.title || trip?.userSelection?.travelList?.desc // if object → pick a property
          }
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;
