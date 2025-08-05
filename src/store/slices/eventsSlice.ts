import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Event } from '../../models/event.model';


export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    const response = await fetch('http://localhost:3000/events');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  }
);

export const fetchEventById = createAsyncThunk(
    'events/eventId',
    async (eventId: number) => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      return response.json();
    }
  );


export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (eventData: {
    title: string;
    description: string;
    date: string | null;
    image: string;
    category: string;
    phone: string;
    email: string;
    location: string;
  }) => {
    const response = await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Failed to add event');
    }
    return response.json();
  }
);

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })

      .addCase(addEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
             .addCase(addEvent.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message || 'Failed to add event';
       })

       .addCase(fetchEventById.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(fetchEventById.fulfilled, (state, action) => {
         state.loading = false;

         const existingEvent = state.events.find(event => event.id === action.payload.id);
         if (!existingEvent) {
           state.events.push(action.payload);
         }
       })
       .addCase(fetchEventById.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message || 'Failed to fetch event';
       });
  },
});

export const { clearError, setEvents } = eventsSlice.actions;
export default eventsSlice.reducer; 