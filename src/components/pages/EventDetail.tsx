import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography, Card, CardMedia, Button, Chip, Box, Alert } from "@mui/material";
import { getImageUrl } from "../../utils/imageUtil.ts";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { fetchEventById } from "../../store/slices/eventsSlice.ts";
import { formatDate } from "../../utils/formating.ts";

export default function EventDetail() {
    const params = useParams<{eventId: string}>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { events, loading, error } = useAppSelector((state) => state.events);

    const event = events.find(event => event.id === Number(params.eventId));

    useEffect(() => {
        dispatch(fetchEventById(Number(params.eventId)))
    }, [params.eventId, dispatch]);

    if (loading) return <Alert severity="info">Ładowanie...</Alert>;
    if (error) return <Alert severity="error">Błąd: {error}</Alert>;
    if (!event) return <div>Nie znaleziono wydarzenia</div>;
    return (
        <div>
            <Card sx={{ p: 5, m: 10 }}>
            <CardMedia component="img" height="500" image={getImageUrl(event?.image || '')} alt={event?.title || ''} />
                <Typography variant="h3">Szczegóły wydarzenia: {event?.title}</Typography>
                <Box sx={{ mb: 3 }}>
                  <Chip 
                    label={event?.category} 
                    color="secondary" 
                    sx={{ mb: 2, mt: 2 }}
                  />
                  <Typography variant="body1" sx={{ flexGrow: 1, mb: 3 }}>
                  {event?.description}
                </Typography>
                </Box>
                <Typography variant="body1">Data:  {formatDate(event?.date.toString())}</Typography>
                <Typography variant="body1">Lokalizacja: {event?.location}</Typography>
                <Typography variant="body1">Telefon: {event?.phone}</Typography>
                <Typography variant="body1">Email: {event?.email}</Typography>
                <Button sx={{mt: 2 }} variant="contained" color="primary" onClick={() => navigate(-1)}>
                    Wróć
                </Button>
            </Card>
        </div>
    );
}