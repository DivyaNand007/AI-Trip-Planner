import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover.jsx"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import imagePlaceholder from '../../assets/image.jpg';








function Header() {
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const navigation = useNavigation;

  useEffect(() => {
    console.log("User Details", user)
  }, []);

  const login = useGoogleLogin({       //Method one-tap copied from oauth from login
    onSuccess: (codeResp) => GetUserProfile(codeResp),    //on success gives response
    onError: () => console.log('Login Failed')
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      })
      .then((resp) => {
        // console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data)); //jo data aya h as response usko localStorage mein save kar dege
        setOpenDialog(false); //user data save hone k baad dialog band hoga
        window.location.reload()
      })
  }
  // console.log("imagePlaceholder", imagePlaceholder);

  return (
    <div className='p-2 flex justify-between items-center px-5' >
      <img src='/logo1.png' className='h-20 sm:h-22 md:h-25 lg:h-28 xl:h-30 object-contain ' />

      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <a href='/my-trips'>
              <Button className="rounded-full hover:bg-gray-600">My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger><img src={user?.picture ? user.picture : imagePlaceholder} alt="Profile" className="w-11 h-11 rounded-full object-cover  " />

              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout(); {/**Logout using google logout */ }
                  localStorage.clear(); {/**To clear storage upon logout */ }
                  window.location.reload(); {/**To refresh */ }
                  navigation('/')
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div> : <Button onClick={() => setOpenDialog(true)}>
            Sign In</Button>}

      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/**<DialogTrigger>Open</DialogTrigger>                We dont need this one as we need to open it with the button click */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              <img src='/logo1.png' className='h-20 sm:h-22 md:h-25 lg:h-28 xl:h-30 rounded-full' />
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

    </div>
  )
}

export default Header
