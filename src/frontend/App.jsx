import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { caretBackOutline, caretForwardOutline } from 'ionicons/icons';
import './index.css';

const ActivityPlanner = () => {
  const [events, setEvents] = useState([]);

  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/events?size=200'); // update the port here;
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const currentEvent = events[currentEventIndex];

  return (
    <div className="app">
      <h1>Boston EventHandler</h1>
      <div className="display-card">
        {currentEvent ? (
          <>
            <h2>{currentEvent.name}</h2>
            <img src={currentEvent.image} alt={currentEvent.name} style={{
                width: '300px',
                height: '200px', 
                objectfit: 'cover', 
                borderRadius: '20px' 
            }} />
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
        <button className="add-btn">Add Item to List</button>
      </div>
    </div>
  );
};

export default ActivityPlanner;