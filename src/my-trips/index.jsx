import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCardItem from './UserTripCardItem';
import { CiLocationArrow1 } from "react-icons/ci";
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';


function MyTrips() {

  const navigate = useNavigate();

  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUSerTrips();


  }, [])

const GetUSerTrips = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/");
    return;
  }

  try {
    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    // Collect all trips first
    const trips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched trips:", trips);

    setUserTrips(trips); // update state once
  } catch (error) {
    console.error("Error fetching user trips:", error);
  }
};




  return (
    <div className='px-2 sm:px-6 md:px-12 lg:px-5 xl:px-5 2xl:px-5 3xl:px-5 mt-10'>

      <h2 className='text-3xl text-blue-700 font-bold text-shadow-white font-serif my-10 text-left'>
        <CiLocationArrow1 className="inline" /> MY TRIPS
      </h2>

      <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 2xl:grid-cols-4'>    {/**Skeleton Effect in ternary operator other option */}
        {userTrips.length>0? userTrips.map((trip, index) => (
          <UserTripCardItem trip={trip} key={index} />
        ))
        :[1,2,3,4,5,6].map((item, index)=>(   
          <div key={index} className='h-full w-full bg-slate-200 animate-pulse rounded-xl '>


          </div>
        ))
        }
      </div>


    {/* Adding Button here */}
      <div>
        <Link to={'/create-trip'}>
          <Button className='p-7 text-lg my-10 hover:bg-gray-700'>Generate Trip Page</Button>
        </Link>
      </div>
      <div>
        <Link to={'/'}>
          <Button className='p-7 text-lg mb-10 hover:bg-gray-700' >Home Page</Button>
        </Link>
      </div>
      <Footer />

    </div>

  )

}
export default MyTrips
