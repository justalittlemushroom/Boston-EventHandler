import React from 'react';
import { IonIcon } from '@ionic/react';
import { caretBackOutline, caretForwardOutline } from 'ionicons/icons';
import './index.css';

const ActivityPlanner = () => {
  return (
    <div className="app">
      <h1>Boston Activity Planner</h1>
      <div className="display-card">
        <h2>Location title goes here</h2>
        <img src="https://example.com/image.jpg" alt="Example Image" />
      </div>
      <div className="button-group">
        <button className="next-btn">
          <IonIcon icon={caretBackOutline} />
        </button>
        <button className="prev-btn">
          <IonIcon icon={caretForwardOutline} />
        </button>
        <button className="add-btn">Add Item to List</button>
      </div>
    </div>
  );
};

export default ActivityPlanner;
