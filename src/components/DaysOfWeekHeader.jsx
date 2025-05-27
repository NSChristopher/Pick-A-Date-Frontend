import React from 'react';

const DaysOfWeekHeader = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="grid bg-gray-200 rounded-sm grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
                <div key={day} className="w-10 h-10 flex items-center justify-center">
                    <span className="text-sm font-semibold">{day}</span>
                </div>
            ))}
        </div>
    );
};

export default DaysOfWeekHeader;
