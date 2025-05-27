import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage'
import EventPage from './pages/EventPage'
import MainLayout from './layouts/MainLayout'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ParticipantProvider } from './contexts/ParticipantContext'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/event/:token" element={<EventPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Route>
  )
)

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ParticipantProvider>
        <RouterProvider router={router} />
      </ParticipantProvider>
    </QueryClientProvider>
  );
}

export default App
