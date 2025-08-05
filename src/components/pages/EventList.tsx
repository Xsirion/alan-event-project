import { useEffect } from "react";
import EventItem from "../EventItem";
import styles from "./EventList.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchEvents } from "../../store/slices/eventsSlice";
import { Alert } from "@mui/material";

export default function EventList() {
    const dispatch = useAppDispatch();
    const { events: loadedEvents, loading, error } = useAppSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    if (loading) return <Alert severity="info">Ładowanie...</Alert>;
    if (error) return <Alert severity="error">Błąd: {error}</Alert>;


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