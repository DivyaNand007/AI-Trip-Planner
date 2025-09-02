import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../../components/InfoSection';
import Hotels from '../../components/Hotels';
import PlacesToVisit from '../../components/PlacesToVisit';
import Footer from '../../components/Footer';

function ViewTrip() {

    const {tripId} = useParams();      //Getting tripId from url. Note folder aur iska name tripid same hona chahiye
  

    //Storing information into states:
    const [trip, setTrip] = useState([]); //here we are saving the docSnap.data()of trip every time new trip is generated
 //whenever we get new Trip data we need to run GetTripData   
    useEffect(()=>{
        tripId&& GetTripData();
    },[tripId])


    //Getting data from the firebase. get code from firebase documentation
    const GetTripData=async() => {
        const docRef=doc(db, "AiTrips" , tripId); //method h to get data it similarly that we used to save in firestore
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){                   //.exists and .data are defined
            console.log("Document:" , docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document");
            toast("No trip found");
        }
    }
    return (
    <div className='p-5 md:px-10 lg:px-10 xl:px-10 '>
    {/* Information section */}
    <InfoSection trip={trip} />     {/*pasing data using props*/} 

    {/* Recommended Hotels */}
    <Hotels trip={trip}/>

    {/* Daily Plans */}
    <PlacesToVisit trip={trip} />

    {/* Footer */}
    <Footer />


    </div>
  )
}

export default ViewTrip
