
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState } from 'react';
import Input from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelLists } from '../constants/options';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { getTravelPlan } from '../service/AIModel.jsx';  //this is a named export for gemini 2.0 pro
// import generateTravelPlan from '../service/AIModel.jsx';    //this is a default export for gemini 2.0

import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useGoogleLogin } from '@react-oauth/google'; //for google one-tap oauth 
import axios from 'axios';


import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig.jsx';
import { CiLocationArrow1 } from "react-icons/ci";

//////////////////////////////////////////////////////////////////////////////////////////////////

const CreateTrip = () => {
  const [place, setPlace] = useState(''); //UseState for GooglePlaces Autocomplete storing place searched.


  //useState for generating variable and function to change and store form data
  const [formData, setFormData] = useState({});


  //dialouge for user login
  const [openDialog, setOpenDialog] = useState(false);

  //For loading states
  const [loading, setLoading] = useState(false);
  //////////////////////////////////////////////////////////////////////////

  //Router method 
  const navigate = useNavigate();

  function stripCodeBlock(str) { //helper function to process out from gemini 2.0
    if (!str) return '';
    // Remove opening ```json or ```
    str = str.replace(/^```[jJ][sS][oO][nN]\s*\n?/, '');
    // Remove opening plain ```
    str = str.replace(/^```\s*\n?/, '');
    // Remove ending ```
    str = str.replace(/```\s*$/, '');
    return str.trim();
  }

  //This function is to verify input conditions, and store form data from user input.
  //User input ko lata h aur object ki tarah store karta h aur previous input ko bhi rakhta h.
  //Function 1
  const handleInputChange = (name, value) => {
    if (name == 'noOfDays' && value > 5) {                          //Here ye return nothing kar raha h, to if user 5 se jyada date dalega to koi value return nhi hogi aur form me bhi nhi aiga
      // alert('You can only plan for a maximum of 5 days.');
      console.log("You can only plan for a maximum of 5 days.");
      return;
    }
    if (name == 'noOfDays' && value < 1) {  //Here ye return nothing kar raha h, to if user 5 se jyada date dalega to koi value return nhi hogi aur form me bhi nhi aiga
      // alert ("Days can't be less than 1");
      console.log("Days can't be less than 1");
      return;
    }
    setFormData({                                     //passing an object in setFormData.
      ...formData,
      [name]: value
    })
  };

  //USeEffect hook to print form data in console whenever the form data changes.
  //Function 2
  useEffect(() => {                   //This is just so I can see the changes in the console window. 
    console.log(formData);
  }, [formData]);



  //Function 3
  //This function is triggered by Button click.
const OnGenerateTrip = async () => {
  if (formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.travelList) {
    toast("Fill all the details");
    return;
  }

  const user = localStorage.getItem('user');
  if (!user) {
    setOpenDialog(true);
    return;
  }

  setLoading(true);

  const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.travelList)
    .replace('{budget}', formData?.budget);

  console.log("Final Prompt:", FINAL_PROMPT);

  try {
    // Retry Gemini API
    let result;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        result = await getTravelPlan(FINAL_PROMPT);
        break;
      } catch (err) {
        if (err?.status === "UNAVAILABLE" && attempt < 2) {
          console.warn("Gemini overloaded, retrying in 3s...");
          await new Promise(r => setTimeout(r, 3000));
          continue;
        }
        throw err;
      }
    }

    let tripText = typeof result === "string" ? result : result?.text;
    const cleanedTripText = stripCodeBlock(tripText);

    // Parse JSON if possible, else save as plain text
    try {
      const tripJson = JSON.parse(cleanedTripText);
      await SaveAiTrip(tripJson);
    } catch {
      await SaveAiTrip(cleanedTripText);
    }

  } catch (error) {
    console.error("Error generating trip:", error);
    toast("Something went wrong while generating the trip");
  } finally {
    setLoading(false);
  }
};






      // const result = await getTravelPlan(FINAL_PROMPT);//AI gemini module usage, AI model calling
      // console.log("--", result?.response?.text());
      // setLoading(false);
      // // SaveAiTrip("--", result?.response?.text());
      // const tripText = typeof result === "string" ? result : result?.text || (await result?.response?.text?.());
      // SaveAiTrip(tripText);

      // The function getTravelPlan(FINAL_PROMPT) is giving you a result, but it doesn't have a response field like you expected.
      // Maybe result is a string directly
      // Or maybe result is like { text: "your trip details" }
      // But it's not like { response: { text() {} } } (which is what your code used)


      // SaveAiTrip(result?.response?.text())
    
  // function 6: storing in firebase
const SaveAiTrip = async (TripData) => {
  setLoading(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const DocId = Date.now().toString();

  await setDoc(doc(db, "AiTrips", DocId), {
    userSelection: formData,
    tripData: TripData,
    userEmail: user?.email,
    id: DocId
  });

  setLoading(false);
  navigate(`/view-trip/${DocId}`);
};



    //Function 4: User login: @react-oauth/google package:
    const login = useGoogleLogin({       //Method one-tap copied from oauth
      onSuccess: (codeResp) => GetUserProfile(codeResp),    //on success gives response
      onError: () => console.log('Login Failed')
    });


    //function 5
    //To get user profile through generated tokens
    const GetUserProfile = (tokenInfo) => {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'Application/json'
          }
        })
        .then((resp) => {
          console.log(resp);
          localStorage.setItem('user', JSON.stringify(resp.data)); //jo data aya h as response usko localStorage mein save kar dege
          setOpenDialog(false); //user data save hone k baad dialog band hoga
          OnGenerateTrip();    //method will be called so ai agent can work.
        })
    }








    //Start of the return statement, UI part
    return (

      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 py-10'>
        <h2 className='text-2xl text-blue-700 font-bold text-shadow-white font-serif mt-10 text-left'>
          <CiLocationArrow1 className="inline-block" /> Tell us your travel preferences:
        </h2>
        <p className='mt-3 mb-10 text-gray-600 text-xl text-left font-bold'>
          Just provide some basic information about your trip, and we'll handle the rest.
        </p>

        <div className='mt-15'>
          <h2 className='text-xl my-5 mt-9 font-medium text-left'>What is destination of choice? </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div className='mt-10 flex flex-col gap-6'>
          <h2 className='mt-15 text-left font-medium text-xl'>How many days are you planning to visit for?</h2>
          <Input type="number" placeholder={'Ex. 3'} min='0'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div >
          <h2 className='mt-15 text-left font-medium text-xl'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg hover:bg-amber-200 cursor-pointer transition-all duration-200
    ${formData?.budget === item.title
                    ? 'border-black bg-amber-200 shadow-lg'
                    : 'border-gray-400'
                  }`
                }
              > { /*Div tag ends here*/}
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='text-2xl mt-3 font-bold'>{item.title}</h2>
                <h2 className='text-gray-500 mt-1'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>


        <div >
          <h2 className='mt-15 text-left font-medium text-xl'>What is your Travel List?</h2>
          <div className='grid grid-cols-2 gap-5 mt-5'>
            {SelectTravelLists.map((item, index) => (
              <div key={index}
                className={`p-4  border border-gray-400 rounded-lg hover:shadow-lg  hover:bg-amber-200 cursor-pointer
              ${formData?.travelList == item.people
                    ? 'border-black bg-amber-200 shadow-lg'
                    : 'border-gray-400'}`}
                onClick={() => handleInputChange('travelList', item.people)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='text-2xl mt-3 font-bold'>{item.title}</h2>
                <h2 className='text-gray-500 mt-1'>{item.desc}</h2>
                <h2 className='mt-3'>{item.people}</h2>
              </div>
            ))}
          </div>
        </div>



        <div>
          <Button className='my-7 p-7 text-xl hover:bg-gray-700'
            disabled={loading}
            onClick={OnGenerateTrip}>{loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
          </Button>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          {/**<DialogTrigger>Open</DialogTrigger>                We dont need this one as we need to open it with the button click */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
              <DialogDescription>
                <img src='/logo1.png' className='h-20 sm:h-22 md:h-25 lg:h-28 xl:h-30 object-contain' />
                <h2 className="mt-9 mb-2 text-2xl font-bold">Sign in with GOOGLE</h2>
                <h3 className='mb-5 text-2xl'>Sign in with Google Authentication Security</h3>
                <Button
                  onClick={login}
                  className='w-full mb-2 hover:bg-gray-700 flex gap-3 py-4 text-lg'
                >
                  <FcGoogle /> Sign in</Button>

              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>




        <Link to={'/'}>
          <Button className='p-7 text-lg hover:bg-gray-700'>Home Page</Button>
        </Link>



      </div>

    )
  }

  export default CreateTrip;