import React from 'react';

const MonthHeader = ({ month, year }) => {
    return (
        <div className="col-span-7 flex justify-between items-center h-10 px-4">
            <h2 className="text-lg font-bold">{month}</h2>
            <h2 className="text-lg font-bold">{year}</h2>
        </div>
    );
};

export default MonthHeader;
