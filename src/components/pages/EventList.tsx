import { useState, useEffect } from "react";
import EventItem from "../EventItem";
import styles from "./EventList.module.css";
import type { Event } from "../../models/event.model.ts";

export default function EventList() {

    const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);

    useEffect(() => {
        
    async function fetchEvents() {
        try {
            const response = await fetch("http://localhost:3000/events");
            const events = await response.json();
            console.log(events);
            setLoadedEvents(events)
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    fetchEvents();
    }, []);


  return (
    <>
        <div className={styles.eventList}>
            {loadedEvents.map(event => 
                <EventItem key={event.id} event={event} />
            )}
        </div>
    </>
  );
}