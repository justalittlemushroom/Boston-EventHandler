import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { caretBackOutline, caretForwardOutline } from 'ionicons/icons';
import { addEvent, deleteEvent, getEvents } from '../backend/storage.jsx'
import './index.css';

const ActivityPlanner = () => {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [savedListVisible, setSavedListVisible] = useState(false);
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    getEvents(setEvents);
  }, []);

  // fetches Boston events
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/events?size=200');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // fetches next event
  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  // fetches previous event
  const prevEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
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