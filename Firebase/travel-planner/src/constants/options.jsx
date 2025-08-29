export const SelectTravelLists=[
    {
        id:1,
        title:'Just Me',
        desc: 'A sole travels in exploration',
        icon: '✈',
        people: '1 person'

    },
    {
        id:2,
        title: 'A couple',
        desc: 'Two travels in tandem',
        icon: '🍻',
        people: '2 people'
    },
    {
        id:3,
        title: 'Group',
        desc: 'A group of travelers',
        icon: '🏚',
        people: '3 - 5 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill seeks',
        icon: '🤟',
        people: '5 - 10 people'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Low',
        desc: 'Stay conscious of costs',
        icon: '🪙'
    },
    {
        id: 2,
        title:'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💸'
    },
    {
        id: 3,
        title:'High',
        desc: 'Spend freely on experiences',
        icon: '💰'
    } 
]
export const AI_PROMPT = `
Generate a travel plan for Location: {location}, for {totalDays} days, for {traveler}, on a {budget} budget. Show multiple options.

Reply with ONLY valid JSON – NO markdown, NO explanations, NO preamble, NO notes, NO extra text.

The JSON object must look like this:
{
  "hotels": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "hotelPrice": "",
      "hotelImageUrl": "",
      "geoCoordinates": "",
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "places": [
        {
          "placeName": "",
          "placeDetails": "",
          "timeToVisit": "",
          "placeImageUrl": "",
          "geoCoordinates": "",
          "ticketPricing": ""
        }
      ]
    }
  ]
}

If you do not know a field's value, leave it as an empty string, but DO NOT skip any part of the above JSON structure.
AGAIN: Return only JSON, no other text.
`;
















// export const AI_PROMPT = `
// Generate a travel plan for the Location: {location}, for {totalDays} days for {traveler} with a {budget} budget.

// Return ONLY a valid JSON object, with no markdown, code blocks, or extra text.

// JSON must include these top-level fields:
// {
//   "hotels": [
//     {
//       "hotelName": "",
//       "hotelAddress": "",
//       "hotelPrice": "",
//       "hotelImageUrl": "",
//       "geoCoordinates": "",
//       "rating": "",
//       "description": ""
//     }
//   ],
//   "itinerary": [
//     {
//       "day": 1,
//       "places": [
//         {
//           "placeName": "",
//           "placeDetails": "",
//           "placeImageUrl": "",
//           "geoCoordinates": "",
//           "ticketPricing": ""
//         }
//       ]
//     }
//   ]
// }
// If information is not available for a field, omit that field completely. Only output the JSON as specified above.
// `;