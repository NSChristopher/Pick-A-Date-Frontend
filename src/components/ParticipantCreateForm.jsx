import React from 'react'
import { useState } from 'react'
import api from '../utils/axios';
import { useMutation } from '@tanstack/react-query';

const ParticipantCreateForm = () => {
  const { token } = useParams()

  // State for form submission
  const [formData, setFormData] = useState({
    
  });

  const updateFormData = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  return (
    <div className='p-4'>

      {/* New Participant Form */}
      <h1 className='text-2xl font-bold mb-4'>New Participant</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
              required
              placeholder='Name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Phone</label>
            <input
              type='text'
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
              required
              placeholder='Phone'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>zip code</label>
            <input
              type='text'
              value={formData.postalCode}
              onChange={(e) => updateFormData('postalCode', e.target.value)}
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
              required
              placeholder='Postal Code'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Do you have a car?</label>
            <input
              type='checkbox'
              checked={formData.isDriver}
              onChange={(e) => updateFormData('isDriver', e.target.checked)}
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
            />
          </div>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Create Participant</button>
        </form>

      <div className='my-8 border-t border-gray-300'></div>

      {/* Returning Participant Form */}
      <h1 className='text-2xl font-bold mb-4'>Returning</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='mb-4'>
          <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Phone</label>
          <input
            type='text'
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
            required
            placeholder='Phone'
          />
        </div>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Return Participant</button>
      </form>
    </div>
  )
}

export default ParticipantCreateForm
