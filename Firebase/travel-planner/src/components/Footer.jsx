import React from 'react'
import { Link } from 'react-router-dom'



function Footer() {
  return (
    <div className='text-white my-10 sm:text-md md:text-lg lg:text-xl xl:text-2xl bg-gray-500 hover:bg-gray-700 border-gray-300'>
        <Link to={'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHO4AEG_zL8ZAAAAZiYbcM4-BlBz8n44-TkQy8MHO2aabo988gcoMfik9W-CBkWZkJjUbzR0IvTdFXZxnDMO91uGndCbUMc-QIgVBtvDUszPvD550vHeC88GZoB-NKojPiRuq4=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fdivya-nand-007388220%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app'}>
        | Created By Divyanand |
        </Link>
      
    </div>
  )
}

export default Footer
