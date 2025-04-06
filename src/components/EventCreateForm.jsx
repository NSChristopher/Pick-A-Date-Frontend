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
    addresses: [],
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
      event_name: formData.eventName,
      description: formData.description,
      max_date: formData.maxDate?.toISOString().split('T')[0],
      min_date: formData.minDate?.toISOString().split('T')[0],
      addresses: [
        {
          address_name: formData.addressName || '',
          street_line_1: formData.streetLine1 || '',
          street_line_2: formData.streetLine2 || '',
          city: formData.city || '',
          state_or_province: formData.state || '',
          country_code: formData.countryCode || 'US',
          postal_code: formData.postalCode || '',
          latitude: formData.lat || null,
          longitude: formData.lon || null,
        },
      ],
    };

    console.log('Submitting event:', payload);

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
            onChange={({ start, end }) => {
              updateFormData('minDate', start);
              updateFormData('maxDate', end);
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
                const feature = res.features?.[0];
                if (!feature) return;
              
                const props = feature.properties || {};
                const context = props.context || {};
                const coords = feature.geometry?.coordinates || [];
              
                const addressName = feature.place_name || props.name || '';
                const streetLine1 = context?.address?.name || props.name || '';
                const streetLine2 = context?.neighborhood?.name || '';
                const city = context?.place?.name || '';
                const stateOrProvince = context?.region?.name || context?.region?.region_code || '';
                const postalCode = context?.postcode?.name || '';
                const countryCode = context?.country?.country_code || 'US';
              
                const lat = coords[1] ?? null;
                const lon = coords[0] ?? null;
              
                const location = {
                  addressName,
                  streetLine1,
                  streetLine2,
                  city,
                  stateOrProvince,
                  postalCode,
                  countryCode,
                  lat,
                  lon,
                };
              
                setSelectedLocation(location);
              
                for (const [key, val] of Object.entries(location)) {
                  updateFormData(key, val);
                }
              }}
              options={{ country: ['us'] }}
              value={selectedLocation ? selectedLocation.addressName : ''}
            />
            {selectedLocation && (
              <div className="text-sm text-gray-700 mt-2">
                <p><strong>Selected:</strong> {selectedLocation.addressName}</p>
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
