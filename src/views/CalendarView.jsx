import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from '../utils/axios';
import DayCell from '../components/DayCell';
import DaysOfWeekHeader from '../components/DaysOfWeekHeader';
import MonthHeader from '../components/MonthHeader';

const CalendarView = ({ token, participantId }) => {
    const [selectedDays, setSelectedDays] = useState([]); // Tracks user-selected days
    const [heatMapData, setHeatMapData] = useState({}); // Tracks availability heat map
    const [longPressDay, setLongPressDay] = useState(null); // Tracks day for long press
    const [eventRange, setEventRange] = useState({ start: null, end: null }); // Event date range
    const [usersAvailable, setUsersAvailable] = useState([]); // Users available on a specific day

    // Fetch event date range and heat map data on mount
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const eventResponse = await axios.get(`/events/${token}`);
                const { min_date, max_date } = eventResponse.data.data;
                setEventRange({ start: dayjs(min_date), end: dayjs(max_date) });

                const participantsResponse = await axios.get(`/events/${token}/participants`);
                const heatMap = {};
                participantsResponse.data.data.participants.forEach((participant) => {
                    participant.selected_dates.forEach((date) => {
                        const formattedDate = dayjs(date.date).format('YYYY-MM-DD');
                        heatMap[formattedDate] = (heatMap[formattedDate] || 0) + 1;
                    });
                });
                setHeatMapData(heatMap);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, [token]);

    // Handle day click to toggle availability
    const handleDayClick = async (day) => {
        const formattedDay = day.format('YYYY-MM-DD');
        const isSelected = selectedDays.includes(formattedDay);

        try {
            if (isSelected) {
                // Remove availability
                await axios.delete(`/events/${token}/participants/${participantId}/dates`, {
                    data: { date: formattedDay },
                });
                setSelectedDays(selectedDays.filter((d) => d !== formattedDay));
            } else {
                // Add availability
                await axios.post(`/events/${token}/participants/${participantId}/dates`, {
                    date: formattedDay,
                    availability_level: 0, // 0: Available
                });
                setSelectedDays([...selectedDays, formattedDay]);
            }
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    };

    // Handle long press to fetch users available on a specific day
    const handleLongPress = async (day) => {
        const formattedDay = day.format('YYYY-MM-DD');
        setLongPressDay(formattedDay);

        try {
            const participantsResponse = await axios.get(`/events/${token}/participants`);
            const availableUsers = participantsResponse.data.data.participants.filter((participant) =>
                participant.selected_dates.some((date) => dayjs(date.date).isSame(formattedDay, 'day'))
            );
            setUsersAvailable(availableUsers);
        } catch (error) {
            console.error('Error fetching users available on this day:', error);
        }
    };

    // Get heat map color based on availability count
    const getHeatMapColor = (count) => {
        if (count > 10) return 'bg-red-500';
        if (count > 5) return 'bg-yellow-500';
        if (count > 0) return 'bg-green-500';
        return 'bg-gray-200';
    };

    // Generate list of days in the event range, including days outside the current month
    const daysInRange = [];
    if (eventRange.start && eventRange.end) {
        let day = eventRange.start.startOf('month'); // Start from the first day of the event's start month
        const endDay = eventRange.end.endOf('month'); // End at the last day of the event's end month

        while (day.isBefore(endDay) || day.isSame(endDay, 'day')) {
            daysInRange.push(day);
            day = day.add(1, 'day');
        }
    }

    // Adjust rendering to exclude leading and trailing days from adjacent months
    const renderCalendarGrid = () => {
        const calendar = [];
        let currentMonth = '';

        daysInRange.forEach((day) => {
            const month = day.format('MMMM');
            const year = day.format('YYYY');

            if (month !== currentMonth) {
                currentMonth = month;
                calendar.push(<MonthHeader key={`${month}-${year}`} month={month} year={year} />);

                // Add empty cells for alignment if the month doesn't start on Sunday
                const firstDayOfWeek = day.startOf('month').day();
                for (let i = 0; i < firstDayOfWeek; i++) {
                    calendar.push(<div key={`empty-${month}-${i}`} className="w-10 h-10"></div>);
                }
            }

            // Skip days that are not part of the current month
            if (day.month() !== dayjs(`${year}-${month}-01`).month()) {
                return;
            }

            const isOutsideEventRange = day.isBefore(eventRange.start, 'day') || day.isAfter(eventRange.end, 'day');
            const isSelected = selectedDays.includes(day.format('YYYY-MM-DD'));
            const heatMapValue = heatMapData[day.format('YYYY-MM-DD')] || 0;

            calendar.push(
                <DayCell
                    key={day.format('YYYY-MM-DD')}
                    day={day}
                    isOutsideEventRange={isOutsideEventRange}
                    isSelected={isSelected}
                    heatMapData={heatMapValue}
                    onClick={() => !isOutsideEventRange && handleDayClick(day)}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        !isOutsideEventRange && handleLongPress(day);
                    }}
                />
            );
        });

        return calendar;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <DaysOfWeekHeader />
            <div className="grid grid-cols-7 gap-1">{renderCalendarGrid()}</div>
            {/* Long press modal */}
            {longPressDay && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Users available on {longPressDay}</h3>
                        <ul>
                            {usersAvailable.map((user, index) => (
                                <li key={index}>{user.name}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setLongPressDay(null)}
                            className="mt-4 px-4 py-2 bg-mint-500 text-white rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
