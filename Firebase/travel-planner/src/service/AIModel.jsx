// service/AIModel.jsx

import { GoogleGenAI } from '@google/genai';

// Get the Gemini API key from your Vite env variable
const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

/**
 * Calls Gemini with a given prompt, returns model's reply as string.
 * @param {string} prompt - Fully formatted prompt string
 * @returns {Promise<string>} - Model's reply (expected: JSON string)
 */
export async function getTravelPlan(prompt) {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  // No tools needed here, unless you want Google Search as well.
  const contents = [
    { role: 'user', parts: [{ text: prompt }] }
  ];

  // Using the default (non-streaming) call for simplicity
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents,
    // config: {}, // Only needed if using tools
  });

  // The response shape: { candidates: [{ content: { parts: [{ text: "your content" }] } }] }
  const output = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return output; // Should be just the JSON, as you prompted
}





































//Gemini 2.0 model
// import axios from 'axios';

// const MODEL = genAI.getGenerativeModel({
//   model:'gemini-2.5-pro',});
//    // Use the latest model available to you
// const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
// const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY; // Vite-specific env variable
// const genAI = GoogleGenerateiveAI(apiKey);

// export async function getTravelPlan(prompt) {
//   try {
//     const response = await axios.post(
//       `${ENDPOINT}?key=${API_KEY}`,
//       {
//         contents: [
//           {
//             role: 'user',
//             parts: [{ text: prompt }]
//           }
//         ],
//         generationConfig: {
//           temperature: 0.9,
//           topP: 1,
//           maxOutputTokens: 2048,
//         }
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//     // Gemini usually returns text in this location:
//     const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
//     try {
//       return JSON.parse(aiText); // If it's proper JSON
//     } catch {
//       return aiText; // Fallback for plain text
//     }
//   } catch (error) {
//     console.error('Gemini API error:', error);
//     throw error;
//   }
// }
















































// // Install the required package in your project:
// // npm install @google/genai mime
// //gemini 2.0 flash
// import { GoogleGenAI } from '@google/genai';

// async function generateTravelPlan(location, days, budget) {
//   const ai = new GoogleGenAI({
//     apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY, // For security, retrieve from environment in production
//   });
//   const model = 'gemini-2.0-flash';

//   const userPrompt = `Generate travel plan for Location: ${location}, for ${days} days for couple with a ${budget} budget. Give me hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place, Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for ${days} days with each day plan with best time to visit in JSON format.`;

//   const contents = [
//     {
//       role: 'user',
//       parts: [{ text: userPrompt }],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     contents,
//   });

//   let output = '';
//   for await (const chunk of response) {
//     output += chunk.text;
//   }

//   // The model may return a markdown code block, so you may need to extract JSON
//   const match = output.match(/``````/);
//   const jsonStr = match ? match[1] : output;
//   try {
//     const json = JSON.parse(jsonStr);
//     return json;
//   } catch (e) {
//     // If parsing fails, inspect output for formatting errors
//     console.error('Failed to parse JSON:', e, jsonStr);
//     return null;
//   }
// }

// export default generateTravelPlan;














































// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // const { GoogleGenerativeAI } = require("@google/generative-ai");
// // require('dotenv').config(); // For environment variables

// // async function main() {
// //   // 2. Initialize with your API key
// //   const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
// //   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
// //   // 3. Get the model (using gemini-1.5-pro-latest which is free)
// //   const model = genAI.getGenerativeModel({ 
// //     model: "gemini-1.5-pro-latest",
// //     generationConfig: {
// //       temperature: 0.9, // More creative responses
// //       topP: 1,
// //     }
// //   });

// //   // 4. Your travel plan prompt
// //   const prompt = `Generate travel plan for Location: Las Vegas, for 3 days for couple with a cheap budget. 
// //   Provide in JSON format with:
// //   - Hotel options (Name, Address, Price, Image URL, Coordinates, Rating, Description)
// //   - Daily itinerary (Place Name, Address, Details, Image URL, Coordinates, Ticket Price, Best Time to Visit)`;

// //   try {
// //     // 5. Generate content
// //     const result = await model.generateContent(prompt);
// //     const response = await result.response;
// //     const text = response.text();
    
// //     // 6. Output the result
// //     console.log(JSON.parse(text)); // Parses the JSON response
    
// //   } catch (error) {
// //     console.error("Error:", error);
// //   }
// // }

// // main();

// GoogleGenerativeAI,
// HarmCategory,
// HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
// const genAI =,new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
// });

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     ResponseMimeType: 'application/json',
// };


//   export const chatSession = model.startChat({
//         generationConfig,
//         history: [
//             {
//                 role: "user",
//                 parts: [
//                     {text: "Generate travel plan for Location : Las Vegas, for 3 days for couple with a cheap budget. Give me hotels options list with HotelName , Hotel address, Price, hotel image url, geo coordinates , rating , descriptions and suggest itenary with placeName , Place, Details, Place Image Url, Geo  Coordinates , ticket Pricing , Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
//                 ],
//                 ]
//             }
//         ]

//     })
