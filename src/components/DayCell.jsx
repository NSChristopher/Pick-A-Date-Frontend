import React from 'react';

const DayCell = ({ day, isOutsideEventRange, isSelected, heatMapData, onClick, onContextMenu }) => {
    return (
        <div
            className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${
                isOutsideEventRange ? 'bg-gray-300 text-gray-500' : ''
            } ${
                isSelected ? 'border-2 border-mint-500 scale-110' : ''
            } ${heatMapData}`}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            <span className="text-sm font-semibold">{day.date()}</span>
            {heatMapData > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-gray-800 text-white rounded-full px-1">
                    {heatMapData}
                </span>
            )}
        </div>
    );
};

export default DayCell;
