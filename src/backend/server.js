import express from 'express';
import cors from 'cors';
import { getFormattedEvents } from './ticketmaster.js';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());

app.get('/api/events', async (req, res) => {
  const size = req.query.size || 1;
  try {
    const events = await getFormattedEvents(size);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});