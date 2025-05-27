import React from 'react'
import ParticipantCreateForm from '../components/ParticipantCreateForm'
import { useParams } from 'react-router-dom'
import CalendarView from '../views/CalendarView';

const EventPage = () => {
    const { token } = useParams()

    const participantData = localStorage.getItem(`participant:${token}`);
    if (participantData) {
        const { phone } = JSON.parse(participantData);
    }


    return (
    <>
        
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{`Event ${token}`}</h1>
            {/* CalendarView component */}
            <CalendarView token={token} />
        </div>
    
    </>
    )
}

export default EventPage
