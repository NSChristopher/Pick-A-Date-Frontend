import React from 'react'
import ParticipantCreateForm from '../components/ParticipantCreateForm'
import { useParams } from 'react-router-dom'

const EventPage = () => {
    const { token } = useParams()

    const participantData = localStorage.getItem(`participant:${token}`);
    if (participantData) {
        const { phone } = JSON.parse(participantData);
    }


    return (
    <>
        
        
        <h1 className='text-3xl font-bold'>{`Event ${token}`}</h1>
        
    
    </>
    )
}

export default EventPage
