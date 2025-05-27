import React, { createContext, useEffect, useContext, useState } from 'react';

const ParticipantContext = createContext();

export const useParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
    const [participant, setParticipant] = useState(() => {

        try {
            return JSON.parse(localStorage.getItem('participant')) ?? null;
        } catch (error) {
            console.error('Error parsing participant data from localStorage:', error);
            return null;
        }
    });

    useEffect(() => {
        if (participant) {
            localStorage.setItem('participant', JSON.stringify(participant));
        }
    }, [participant]);

    return (
        <ParticipantContext.Provider value={{ participant, setParticipant }}>
            {children}
        </ParticipantContext.Provider>
    );
};

export const useParticipant = () => useContext(ParticipantContext);


