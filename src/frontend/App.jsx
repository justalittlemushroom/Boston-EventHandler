import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { caretBackOutline, caretForwardOutline } from 'ionicons/icons';
import { addEvent, deleteEvent, getEvents } from '../backend/storage.jsx'
import './index.css';

// formatEvents here, strictly for debugging purposes
async function formatEvents(allEvents) {
  var events = await allEvents;
  // Create an empty array to store formatted events
  const eventList = events.map((event) => {
    // gets the venue of the event
    const venue = event._embedded?.venues?.[0]; 

    // if venue and the address exist, then do them otherwise say it's unnavailable
    const address = venue && venue.address ? 
      `${venue.address.line1}, ${venue.city.name}, ${venue.state.stateCode}, ${venue.postalCode}` 
      : "Address not available";

    return {
      name: event.name,
      url: event.url,
      address: address,
      date: event.dates?.start?.localDate + ", " + event.dates?.start?.localTime,
      image: event.images?.[0].url || 'https://formbuilder.ccavenue.com/live/uploads/company_image/488/17316704336156_Event-Image-Not-Found.jpg'
    };
  });

  // return removeDuplicates(eventList);
  return eventList;
}

const ActivityPlanner = () => {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [savedListVisible, setSavedListVisible] = useState(false);
  const [savedEvents, setSavedEvents] = useState([]);
  const [page, setPage] = useState(0); // current page of events 
  const [isLoading, setIsLoading] = useState(false);

  // initializes the first few events 
  useEffect(() => {
    fetchEvents();
    getEvents(setEvents);
    const fetchAndLog = async () => {
      const formatted = await formatEvents(events);
      console.log("page: " + page + "\ndata:", formatted);
    };

    fetchEvents(page); // fetch from API
    fetchAndLog(); 
  }, [page]);

  const fetchEvents = async (pageNum) => {
    try {
      // max size is 200 for calls, were doing 10 calls per page
      const size = 10;
      setIsLoading(true);

      const response = await fetch(`http://localhost:3003/api/events?size=${size}&page=${pageNum}`);
      // const response = await fetch('http://localhost:3003/api/events?size=10');
      const data = await response.json();

      if (data) {
        setEvents(prevEvents => [...prevEvents, ...data]);  // Append new events to the list
      } else {
        console.error("No events found in this page.");
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // fetches next event
  const nextEvent = () => {
    if (currentEventIndex === events.length - 1) {
      // if we're on the last event of the current page, go to the next page
      setPage(prevPage => prevPage + 1);
    } else {
      setCurrentEventIndex(prevIndex => prevIndex + 1);
    }
  };

  // fetches previous event
  const prevEvent = () => {
    if (currentEventIndex === 0 && page > 1) {
      // if were at the first event, go to the last page 
      setPage(prevPage => prevPage - 1);
      setCurrentEventIndex(events.length - 1);
    } else {
      setCurrentEventIndex(prevIndex => prevIndex - 1);
    }
  };

  // saves the current event
  const saveEvent = () => {
    addEvent(events[currentEventIndex]);
    getEvents(setSavedEvents); 
  };

  // unsaves the current event
  const unsaveEvent = (event) => {
    deleteEvent(event); 
    getEvents(setSavedEvents); 
  };

  // fetches saved events
  const toggleSavedList = () => {
    setSavedListVisible(!savedListVisible);
    getEvents(setSavedEvents);
  }
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const currentEvent = events[currentEventIndex];

  return (
    <div className="app">
      <h1>Boston EventHandler</h1>
      <div className="display-card">
        {currentEvent ? (
          <>
            <h2>{currentEvent.name}</h2>
            <img src={currentEvent.image} alt={currentEvent.name} className="event-image"/>
            <a href={currentEvent.url}>See the event page!</a>
          </>
        ) : (
          <p>Loading...</p>
        )}

      </div>
      <div className="button-group">
        <button className="next-btn" onClick={prevEvent}>
          <IonIcon icon={caretBackOutline} />
        </button>
        <button className="prev-btn" onClick={nextEvent}>
          <IonIcon icon={caretForwardOutline} />
        </button>
        <button className="add-btn" onClick={saveEvent}>Save Event</button>
      <button className="saved-list-btn" onClick={toggleSavedList}>
        {savedListVisible ? 'Close Saved Events' : 'View Saved Events'}
      </button>

      </div>
      <div className={`saved-events-menu ${savedListVisible ? 'show' : ''}`}>
        <div className="saved-events-list">
          <ul>
            {savedEvents.length > 0 ? (
              savedEvents.map((event) => (
                <li key={event.id}>
                  <h3>
                    <a href={event.url}>{event.name}</a>
                  </h3>
                  <img
                    src={event.image}
                    alt={event.name}
                    className="event-image"
                  />
                  <button 
                    className="delete-btn" 
                    onClick={() => unsaveEvent(event)}>
                    Unsave Event
                  </button>
                </li>
              ))
            ) : (
              <p>No Saved Events Yet!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityPlanner;