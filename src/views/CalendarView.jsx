import React from 'react'

function CalendarView() {
    return (
        // calendar view
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* // days of the week */}
            <div className="grid bg-gray-200 rounded-sm grid-cols-7 gap-3 mb-2">
                <div className="w-10 h-10 flex items-center justify-center ">
                    <span className="text-sm font-semibold">S</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center ">
                    <span className="text-sm font-semibold">M</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center ">
                    <span className="text-sm font-semibold">T</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center ">
                    <span className="text-sm font-semibold">W</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center ">
                    <span className="text-sm font-semibold">T</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center ">
                    <span className="text-sm font-semibold">F</span>
                </div>
                <div className="w-10 h-10 flex items-center justify-center ">
                    <span className="text-sm font-semibold">S</span>
                </div>
            </div>
            {/* // calendar month */}
                {/* // calendar month and year */}
                <div className="grid grid-cols-7 gap-3 mb-2">
                    <div className="col-span-6 flex items-center justify-start">
                        <span className="text-lg font-semibold">January</span>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                        <span className="text-lg font-semibold">2023</span>
                    </div>
                </div>
                {/* // calendar week */}
                <div className="grid grid-cols-7 gap-3 mb-2">
                    {/* // calendar day */}
                    <div className="w-10 h-10 bg-green-300 rounded-sm flex items-center justify-center shadow-md ">
                        <span className="text-sm font-semibold">1</span>
                    </div>
                    <div className="w-10 h-10 bg-green-300 rounded-sm flex items-center justify-center shadow-md ">
                        <span className="text-sm font-semibold">1</span>
                    </div>
                    <div className="w-10 h-10 bg-green-300 rounded-sm flex items-center justify-center shadow-md ">
                        <span className="text-sm font-semibold">1</span>
                    </div>
                    <div className="w-10 h-10 bg-green-300 rounded-sm flex items-center justify-center shadow-md ">
                        <span className="text-sm font-semibold">1</span>
                    </div>
                    <div className="w-10 h-10 bg-green-300 rounded-sm flex items-center justify-center shadow-md ">
                        <span className="text-sm font-semibold">1</span>
                    </div>
                    <div className="w-10 h-10 bg-green-300 rounded-sm flex items-center justify-center shadow-md ">
                        <span className="text-sm font-semibold">1</span>
                    </div>
                    <div className="w-10 h-10 bg-green-300 rounded-sm flex items-center justify-center shadow-md ">
                        <span className="text-sm font-semibold">1</span>
                    </div>
                </div>
        </div>
    )
}

export default CalendarView
