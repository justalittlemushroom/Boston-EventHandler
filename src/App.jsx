import { useState } from "react";
import { addEvent } from "./storage.jsx";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [address, setAddress] = useState("");
  const [timeframe, setTimeframe] = useState(null);
  const [price, setPrice] = useState(0);
  const [saved, setSaved] = useState(false);
  const [tags, setTags] = useState("");
  
  return (
    <div>
    <label>Name</label>
    <input type="text" onChange={(e) => setName(e.target.value)} />
    
    <label>Description</label>
    <input type="text" onChange={(e) => setDescription(e.target.value)} />
    
    <label>Picture URL</label>
    <input type="text" onChange={(e) => setPictureURL(e.target.value)} />
    
    <label>Address</label>
    <input type="text" onChange={(e) => setAddress(e.target.value)} />
    
    <label>Timeframe</label>
    <input type="datetime-local" onChange={(e) => setTimeframe(e.target.value ? new Date(e.target.value).toISOString() : null)} />
    
    <label>Price</label>
    <input type="number" onChange={(e) => setPrice(parseFloat(e.target.value))} />
    
    <label>Saved</label>
    <input type="checkbox" onChange={(e) => setSaved(e.target.checked)} />
    
    <label>Tags (comma-separated)</label>
    <input type="text" onChange={(e) => setTags(e.target.value)} />
    
    <button onClick={() => addEvent(name, description, pictureURL, address, timeframe, price, saved, tags.split(","))}>
    Add Event
    </button>
    </div>
  );
}

export default App;