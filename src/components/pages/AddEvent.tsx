import { Button, TextField, Select, Box, MenuItem, InputLabel, FormControl, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import { Dayjs } from "dayjs";
import { categories } from "../../models/event.model";

export default function AddEvent() {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        if (selectedDate) {
            formData.set('date', selectedDate.toISOString());
        }
        const eventData = Object.fromEntries(formData.entries());
        console.log(eventData);

        fetch('http://localhost:3000/events', {
            method: 'POST',
            body: JSON.stringify(eventData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Dodaj wydarzenie
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField 
                    label="Tytuł" 
                    name="title" 
                    required 
                    fullWidth
                    variant="outlined"
                />
                
                <TextField 
                    label="Opis" 
                    name="description" 
                    required 
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                />
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Data" 
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slotProps={{
                            textField: {
                                required: true,
                                fullWidth: true,
                                variant: 'outlined'
                            }
                        }}
                    />
                </LocalizationProvider>
                
                <TextField 
                    label="Lokalizacja" 
                    name="location" 
                    required 
                    fullWidth
                    variant="outlined"
                />
                
                <TextField 
                    label="URL obrazka" 
                    name="image" 
                    fullWidth
                    variant="outlined"
                    placeholder="https://example.com/image.jpg"
                />
                
                <FormControl fullWidth required>
                    <InputLabel>Kategoria</InputLabel>
                    <Select 
                        name="category" 
                        label="Kategoria"
                        defaultValue=""
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <TextField 
                    label="Telefon" 
                    name="phone" 
                    fullWidth
                    variant="outlined"
                    type="tel"
                />
                
                <TextField 
                    label="Email" 
                    name="email" 
                    fullWidth
                    variant="outlined"
                    type="email"
                />
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    size="large"
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                >
                    {/* {isLoading ? 'Dodawanie...' : 'Dodaj wydarzenie'} */}
                    Dodaj wydarzenie
                </Button>
            </Box>
        </Box>
    );
}