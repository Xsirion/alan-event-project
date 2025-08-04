import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './components/pages/Root'
import EventList from './components/pages/EventList'
import AddEvent from './components/pages/AddEvent'
import EventDetail from './components/pages/EventDetail'
import Error from './components/pages/Error'
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
