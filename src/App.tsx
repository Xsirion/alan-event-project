import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './components/Root'
import EventList from './components/EventList'
import AddEvent from './components/AddEvent'
import EventDetail from './components/EventDetail'
import Error from './components/Error'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <EventList />,
      },
      {
        path: 'add-event',
        element: <AddEvent />,
      },
      {
        path: 'events/:eventId',
        element: <EventDetail />,
      },
    ]
  },
  
]);

function App() {

  return (

      <RouterProvider router={router} />

  )
}

export default App
