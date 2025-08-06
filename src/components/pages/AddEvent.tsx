import { Button, TextField, Select, Box, MenuItem, InputLabel, FormControl, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { FormikHelpers } from "formik";
import type { Event } from "../../models/event.model.ts";
import { Formik, Form } from "formik";
import { initialValues, validationSchema } from "../../utils/validation.ts";
import { categories } from "../../enums/categories.enum.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addEvent } from "../../store/slices/eventsSlice";

export default function AddEvent() {
    const dispatch = useAppDispatch();
    
const handleSubmit = async (
    values: Omit<Event, 'id'>, 
    {setSubmitting, resetForm}: FormikHelpers<Omit<Event, 'id'>>) => {
    setSubmitting(true);

    try {
        const eventData = {
            ...values,
            date: values.date ? values.date.format('YYYY-MM-DD HH:mm:ss') : null
        };

        await dispatch(addEvent(eventData)).unwrap();
        resetForm();
    } catch (error) {
        console.error('Błąd podczas dodawania wydarzenia:', error);
    } finally {
        setSubmitting(false);
    }
};

    return (
        <Box>
            <Typography variant="h3" component="h1" gutterBottom>
                Dodaj wydarzenie
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting, resetForm }) => (
                    <Form style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '600px' }}>
                        <TextField 
                            label="Tytuł" 
                            name="title" 
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                            fullWidth
                            variant="outlined"
                        />
                        
                        <TextField 
                            label="Opis" 
                            name="description" 
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Data" 
                                value={values.date}
                                onChange={(newValue) => setFieldValue('date', newValue)}
                                slotProps={{
                                    textField: {
                                        error: touched.date && Boolean(errors.date),
                                        helperText: touched.date && errors.date ? String(errors.date) : '',
                                        fullWidth: true,
                                        variant: 'outlined'
                                    }
                                }}
                            />
                        </LocalizationProvider>
                        
                        <TextField 
                            label="Lokalizacja" 
                            name="location" 
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.location && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                            fullWidth
                            variant="outlined"
                        />
                        
                        <TextField 
                            label="URL obrazka" 
                            name="image" 
                            value={values.image}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.image && Boolean(errors.image)}
                            helperText={touched.image && errors.image}
                            fullWidth
                            variant="outlined"
                            placeholder="https://example.com/image.jpg"
                        />
                        
                        <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
                            <InputLabel>Kategoria</InputLabel>
                            <Select 
                                name="category" 
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Kategoria"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.category && errors.category && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                    {errors.category}
                                </Typography>
                            )}
                        </FormControl>
                        
                        <TextField 
                            label="Telefon" 
                            name="phone" 
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            fullWidth
                            variant="outlined"
                            type="tel"
                        />
                        
                        <TextField 
                            label="Email" 
                            name="email" 
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            fullWidth
                            variant="outlined"
                            type="email"
                        />
                        
                        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                            {isSubmitting ? 'Dodawanie...' : 'Dodaj wydarzenie'}
                        </Button>
                        <Button type='button' variant="outlined" size='large' onClick={() => resetForm()}>
                            Wyczyść
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}