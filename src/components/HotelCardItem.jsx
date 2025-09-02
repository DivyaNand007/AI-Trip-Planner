import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '../service/GlobalApi.jsx'

function HotelCardItem({ hotel }) {
    const [PhotoUrl, SetPhotoUrl] = useState();

    useEffect(() => {
        // can also write as {hotel&&GetPlacePhoto()} instead of using if() statement
        if (hotel) {
            GetPlacePhoto();
            // Optional: Update photo if screen is resized
            const handleResize = () => {
                GetPlacePhoto();
            };
            window.addEventListener("resize", handleResize); //window is a global obj, and resize is a predefined event belong to windows object
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hotel]);



    // Getting photo from google Api for hotels
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        };
        // try     
        try {
            const resp = await GetPlaceDetails(data);
            // console.log("yaha aiga photos collection:", resp.data);

            const photoName = resp.data?.places[0]?.photos[1]?.name;
            // console.log("Photo ka detail:", photoName);

            if (photoName) {
                const screenWidth = window.innerWidth;
                //  Only use maxWidthPx, Google will auto-adjust height
                const Photo = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${screenWidth}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

                // console.log("Final Photo URL(Hotel):", Photo);
                SetPhotoUrl(Photo); // This will set photo value in PhotoUrl of useState hook. photo is just a string here
            }
            // catch
        } catch (error) {
            console.log("Photo nahi mila", error);
        }
    };

    //       let imageElement;
    // if (PhotoUrl) {
    //   imageElement = (
    //     <img
    //       src={PhotoUrl}
    //       alt={hotel?.hotelName}
    //       className="rounded-xl shadow-xl w-[300px] h-[200px] object-cover"
    //     />
    //   );
    // } else {
    //   imageElement = (
    //     <img
    //       src="../placeholder.jpg"
    //       alt="Placeholder"
    //       className="rounded-xl shadow-xl w-[300px] h-[200px] object-cover"
    //     />
    //   );
    // }

    return (
        <div>
            <Link   //key 1st child pe lagti h. That warning is React reminding you that when rendering lists with .map(), each direct child in the list needs a unique key prop.
                to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}>

                <div>
                    <img
                        src={PhotoUrl ? PhotoUrl : "../placeholder.jpg"}
                        alt={hotel?.hotelName}
                        className="rounded-xl shadow-xl w-[300px] h-[200px] object-cover"
                    />

                    <h2 className='font-serif font-extrabold text-left'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-700 text-left'>📍{hotel?.hotelAddress}</h2>
                    <h2 className='text-xs text-gray-700 text-left'>🪙{hotel.hotelPrice}</h2>
                    <h2 className='text-xs text-gray-500 text-left'>⭐Rating: {hotel.rating}</h2>
                </div>
            </Link>

        </div>
    )
}

export default HotelCardItem
