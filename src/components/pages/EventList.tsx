import EventItem from "../EventItem";
import styles from "./EventList.module.css";
import useHttp from "../../hooks/useHttp.ts";
import { Alert } from "@mui/material";

const requestConfig = {
    method: "GET", 
    headers: {
        "Content-Type": "application/json"
    }
}

export default function EventList() {

    const { data: loadedEvents, isLoading, error } = useHttp(
        "http://localhost:3000/events", 
        requestConfig
    );

    if (isLoading) return <Alert severity="info">Ładowanie...</Alert>;
    if (error) return <Alert severity="error">Błąd: {error}</Alert>;

    return (
        <div className={styles.eventList}>
            {loadedEvents.map(event => 
                <EventItem key={event.id} event={event} />
            )}
        </div>
    );
}