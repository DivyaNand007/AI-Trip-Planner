import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from "./create-trip/index.jsx";
import Header from './components/custom/Header.jsx';
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";




const router = createBrowserRouter([          //Defining routes for all components
  {
    path: "/",
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripId',    //tripId is something and not defined something
    element: <ViewTrip />
  },
  {
    path: '/my-trips',
    element: <MyTrips />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
     <div className="min-h-screen w-screen bg-gradient-to-t from-[#a4f6f6] to-[#ffffff]">

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster /> {/**To show notifications */}
      <RouterProvider router={router} /> {/**Here I made a mistake that space de diya tha = k baad, this is space sensitive */}
    </GoogleOAuthProvider>

    </div>

  </React.StrictMode>




);





// h-screen → height = full viewport height.
// w-screen → width = full viewport width.
// bg-cover → scales image to cover entire area (keeps aspect ratio, may crop).
// bg-center → keeps image centered.
// bg-no-repeat → prevents tiling.