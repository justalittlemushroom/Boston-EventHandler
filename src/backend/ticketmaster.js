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
    const response = await fetch(`${BASE_URL}?size=${size}&apikey=${API_KEY}&marketId=11`);

    // response.ok is true if the status code is between 200 and 299 (indicating a successful request).
    // this is just  good practice; not required 
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    // now we make the data json with all of the information 
    const data = await response.json();
    
    // checks if this data exists, and if it doesn't just return an empty array 
    // if there's anything in the data it's deemed to be a truthy value 
    if (data._embedded && data._embedded.events) {
      // Filter events to only include those in Boston
      const bostonEvents = data._embedded.events.filter((event) => {
        return event._embedded;
      });
      return bostonEvents;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function removeDuplicates(events) {
  const array = await events;
  var seenNames = [];
  var returnedList = [];
  for (let i = 0; i < array.length; i++) { 
    if (!seenNames.includes(array[i].name)) { // if we haven't seen it yet, add it 
      seenNames.push(array[i].name);
      returnedList.push(array[i]);
    }
  }
  
  return returnedList;
}

// makes it not heinously unreadable 
export async function getFormattedEvents(size = 1) {
  const events = await getEvents(size);

  if (events.length === 0) {
    return "No events found.";
  }

// Create an empty array to store formatted events
  const eventList = events.map((event) => {
    // gets the venue of the event
    const venue = event._embedded.venues[0]; 

    // if venue and the address exist, then do them otherwise say it's unnavailable
    const address = venue && venue.address ? 
      `${venue.address.line1}, ${venue.city.name}, ${venue.state.stateCode}, ${venue.postalCode}` 
      : "Address not available";

    return {
      name: event.name,
      url: event.url,
      address: address,
      date: event.dates.start.localDate + ", " + event.dates.start.localTime,
      image: event.images[0].url
    };
  });

  // You can return the array as it is, or format it to a string if needed
  return removeDuplicates(eventList);
}

// gets images 
export async function getEventsImages(size = 1) {
  const events = await getEvents(size);

  if (events.length === 0) {
    return "No events found.";
  }

  // Format the events into a string with event names and links
  const eventsString = events
    .map((event) => `${event.images[0].url}`)
    .join("\n\n"); // Join them with a newline for readability

  return eventsString;
}

console.log(await getFormattedEvents(10));