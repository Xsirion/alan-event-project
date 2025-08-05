import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Event } from "../../models/event.model";
import { Typography, Paper, CardMedia, Button } from "@mui/material";
import { getImageUrl } from "../../util/imageUtil";

export default function EventDetail() {
    const params = useParams<{eventId: string}>();
    const [event, setEvent] = useState<Event>();
    const navigate = useNavigate();

    useEffect(() => {
    async function fetchEvent() {
        const response = await fetch(`http://localhost:3000/events/${params.eventId}`);
        const event = await response.json();
        setEvent(event);
    }
    fetchEvent();
    }, [params.eventId]);

    return (
        <div>
            <Paper sx={{ p: 5, m: 10 }}>
            <CardMedia component="img" height="500" image={getImageUrl(event?.image || '')} alt={event?.title || ''} />
                <Typography variant="h2">Szczegóły wydarzenia: {event?.title}</Typography>
                <Typography variant="body1">{event?.description}</Typography>
                <Typography variant="body1">Kategoria: {event?.category}</Typography>
                <Typography variant="body1">Data: {event?.date.toLocaleString()}</Typography>
                <Typography variant="body1">Lokalizacja: {event?.location}</Typography>
                <Typography variant="body1">Telefon: {event?.phone}</Typography>
                <Typography variant="body1">Email: {event?.email}</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                    Wróć
                </Button>
            </Paper>
        </div>
    );
}