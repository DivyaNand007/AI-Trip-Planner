import axios from "axios"
const BASE_URL='https://places.googleapis.com/v1/places:searchText'

const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': ['places.displayName',
            'places.formattedAddress',
            'places.photos',
            'places.id'
        ]

    }
}
export const GetPlaceDetails=  (data)=>axios.post(BASE_URL,data,config) //yaha bana liye h taki axios call use kar sake.  here parameter are--> URL : API end point, data: request body(what you are sending), config: extra parameters headers , params etc...