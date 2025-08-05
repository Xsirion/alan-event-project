import { Typography, CardContent, CardMedia, Card, Button, CardActions } from "@mui/material";
import type { Event } from "../models/event.model";
import { formatDate } from "../util/formating";
import { getImageUrl } from "../util/imageUtil";
import { useNavigate } from "react-router-dom";

export default function EventItem({event}: {event: Event}) {
    const navigate = useNavigate();

    function navigationHandleDetails() {
        navigate(`/events/${event.id}`);
    }

    return (
        <Card sx={{ maxWidth: 500 }}>
                <CardMedia component="img" height="140" image={getImageUrl(event.image)} alt={event.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {event.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(event.date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {event.location}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={navigationHandleDetails}>Szczegóły</Button>
                </CardActions>
        </Card>
    );
}