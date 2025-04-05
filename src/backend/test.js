import { getEvents, getEventsImages } from './ticketmaster.js'; 
import { getFormattedEvents } from './ticketmaster.js';

// call the function and log the result
// .then is called after the getEvents call finishes, then 
// => is like a lambda function where events is the output 

// getEvents(30).then(events => {
//   console.log(JSON.stringify(events, null, 2)); // log the JSON response in a readable format
//   // JSON.stringify(object: your JSON, replacer: filter / modify, spacing: controls indentation)
// });

getFormattedEvents(5).then(events => {
  console.log(events);
});