import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.get("/events", async (req, res) => {
    try {
    const events = await fs.readFile('./data/events.json', 'utf8');
    res.json(JSON.parse(events));
    } catch (error) {
        res.status(500).json({ message: 'Error reading events' });
    }
});

app.get("/events/:id", async (req, res) => {
    try {
        const eventId = parseInt(req.params.id);

        if (isNaN(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        const events = await fs.readFile('./data/events.json', 'utf8');
        const allEvents = JSON.parse(events);
        const event = allEvents.find(event => event.id === eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error reading event' });
    }
});

app.post("/events", async (req, res) => {
    try {
        const eventData = req.body;

        if (
            eventData.title && 
            eventData.date && 
            eventData.description && 
            eventData.location &&
            eventData.category &&
            eventData.phone
        ) {
            const newEvent = {
                ...eventData,
                id: Math.floor(Math.random() * 1000),
            };
            const events = await fs.readFile('./data/events.json', 'utf8');
            const allEvents = JSON.parse(events);
            allEvents.push(newEvent);
            
            await fs.writeFile('./data/events.json', JSON.stringify(allEvents, null, 2));
            
            res.status(201).json({ 
                message: 'Event added successfully',
                event: newEvent 
            });
        } else {
            res.status(400).json({ 
                message: 'Missing required fields'
            });
        }
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Error adding event' });
    }
});

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  
    res.status(404).json({ message: 'Not found' });
  });
  
  app.listen(3000);
  