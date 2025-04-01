import React, { useState } from 'react';
import CalendarRangePicker from './CalendarDateRangePicker';
import { SearchBox } from '@mapbox/search-js-react';
import { useMutation } from '@tanstack/react-query';
import api from '../utils/axios';

const MAPBOX_API_KEY = 'pk.eyJ1Ijoibm9haC1kZXYtb3V0bG9vayIsImEiOiJjbThrdHdkbGkwYzQ5MmxxMHJhMXY3ZzljIn0.Y6RovEfSGO69MqWHXAOmyg'; // replace this with your Mapbox token

const EventCreateForm = () => {

  // State for form submission
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    maxDate: null,
    minDate: null,
    lon: null,
    lat: null,
  });

  const updateFormData = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  const createEventMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/events/event', payload);
      return res.data;
    },
    onSuccess: (data) => {
      console.log('Event created successfully:', data);
      setCreatedEvent(data);
    },
    onError: (error) => {
      console.error('Error creating event:', error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.eventName,
      description: formData.description,
      maxDate: formData.maxDate?.toISOString().split('T')[0],
      minDate: formData.minDate?.toISOString().split('T')[0],
      lon: formData.lon || null,
      lat: formData.lat || null,
    };

    createEventMutation.mutate(payload);
  };

  const [showLocationInput, setShowLocationInput] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [createdEvent, setCreatedEvent] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name your event.</label>
          <input
            type="text"
            value={formData.eventName}
            onChange={(e) => updateFormData('eventName', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo focus:ring-1 focus:ring-indigo-500 sm:py-2 px-3"
            placeholder="Event Name"
          />
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Describe it.</label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo focus:ring-1 focus:ring-indigo-500 sm:py-2 px-3"
            placeholder="Event Description"
          ></textarea>
        </div>

        {/* Event Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Roughly when should it take place?</label>
          <CalendarRangePicker 
            onChange={({ startDate, endDate }) => {
              updateFormData('minDate', startDate);
              updateFormData('maxDate', endDate);
            }}
          />
        </div>

        {/* Event Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Do you have a place in mind?</label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="checkbox"
              checked={showLocationInput}
              onChange={(e) => {
                setShowLocationInput(e.target.checked);
                setSelectedLocation(null);
                updateFormData('lon', null);
                updateFormData('lat', null);
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </div>
        </div>

        {showLocationInput && (
          <div className="mb-4 space-y-2">
            <SearchBox
              accessToken={MAPBOX_API_KEY}
              onRetrieve={(res) => {
                const feature = res.features[0];
                const lat = feature.geometry.coordinates[1];
                const lon = feature.geometry.coordinates[0];
                const name = feature.properties.full_address || feature.place_name;
                setSelectedLocation({ name, lat, lon });
                updateFormData('lon', lon);
                updateFormData('lat', lat);
              }}
              options={{ country: ['us'] }}
              value={selectedLocation ? selectedLocation.name : ''}
            />
            {selectedLocation && (
              <div className="text-sm text-gray-700 mt-2">
                <p><strong>Selected:</strong> {selectedLocation.name}</p>
                <p>Lat: {selectedLocation.lat}</p>
                <p>Lon: {selectedLocation.lon}</p>
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Event</button>
      </form>
    </div>
  );
};

export default EventCreateForm;
