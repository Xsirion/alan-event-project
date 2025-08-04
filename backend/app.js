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
    const events = await fs.readFile('./data/events.json', 'utf8');
    res.json(JSON.parse(events));
});

app.post("/events", async (req, res) => {
    const newEvent = req.body.events;
    console.log(newEvent);

    if (
        newEvent.title && 
        newEvent.date && 
        newEvent.description && 
        newEvent.image && 
        newEvent.category && 
        newEvent.phone && 
        newEvent.email && 
        newEvent.location
    ) {
        res.status(201).json(newEvent);
    } else {
        res.status(400).json({ message: 'Invalid event data' });
    }
});

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  
    res.status(404).json({ message: 'Not found' });
  });
  
  app.listen(3000);
  