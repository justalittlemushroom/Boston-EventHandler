import dotenv from 'dotenv'; // this lets me go to my .env to hide my API key 
import fetch from 'node-fetch'; // this lets you make requests from the API with the link 

dotenv.config();

const API_KEY = process.env.TICKETMASTER_API_KEY; // this gets my API key from my .env file
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json"; // where we are requesting data from

// async allows the program to run while this function is being processed
// API requests take a while 
// we also write export here to export the function for when we import the file elsewhere
export async function getEvents(size = 1) { // default value is 1 for getEvents(), but passing x will return x events
  try {
    // wait until fetch finishes before moving on to the next line of code 
    const response = await fetch(`${BASE_URL}?size=${size}&apikey=${API_KEY}`);

    // response.ok is true if the status code is between 200 and 299 (indicating a successful request).
    // this is just  good practice; not required 
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    // now we make the data json with all of the information 
    const data = await response.json();
    
    // checks if this data exists, and if it doesn't just return an empty array 
    // if there's anything in the data it's deemed to be a truthy value 
    if (data._embedded && data._embedded.events) {
        return data._embedded.events;
    } else {
        return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}