import React, { useState } from "react";
import dayjs from "dayjs";

const getMonthDays = (monthOffset = 0) => {
  const today = dayjs().add(monthOffset, "month").startOf("month");
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");

  const days = [];
  let day = startOfMonth;

  while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const leadingEmptyDays = startOfMonth.day();
  return { days, monthLabel: today.format("MMMM"), leadingEmptyDays };
};

const CalendarRangePicker = ({ onChange }) => {
  const [monthOffset, setMonthOffset] = useState(0);
  const [range, setRange] = useState({ start: null, end: null });

  const handleDateClick = (date) => {
    let newRange;
  
    if (!range.start || (range.start && range.end)) {
      newRange = { start: date, end: null };
    } else if (date.isBefore(range.start)) {
      newRange = { start: date, end: range.start };
    } else {
      newRange = { ...range, end: date };
    }
  
    setRange(newRange);
  
    if (onChange && newRange.start && newRange.end) {
      onChange({ 
        start: newRange.start.toDate(),
        end: newRange.end.toDate(),
      });
    }
  };
  
  const isInRange = (day) => {
    if (range.start && range.end) {
      return day.isAfter(range.start.subtract(1, "day")) && day.isBefore(range.end.add(1, "day"));
    }
    if (range.start && day.isSame(range.start, "day")) {
      return true;
    }
    return false;
  };

  const renderMonth = (monthShift, showWeekdays) => {
    const { days, monthLabel, leadingEmptyDays } = getMonthDays(monthOffset + monthShift);

    return (
      <div className="flex">
        {/* Month label on the left */}
        <div className="w-24 flex items-start justify-center pt-6">
          <h3 className="font-bold text-lg">{monthLabel}</h3>
        </div>

        {/* Calendar grid */}
        <div className="flex-1 grid grid-cols-7 gap-1 text-sm">
          {showWeekdays &&
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center font-medium">{d}</div>
            ))}

          {!showWeekdays &&
            Array.from({ length: 7 }).map((_, idx) => <div key={`spacer-${idx}`} />)}

          {Array.from({ length: leadingEmptyDays }).map((_, idx) => (
            <div key={`empty-${idx}`} />
          ))}

          {days.map((day) => {
            const selected = isInRange(day);
            return (
              <button
                type="button"
                key={day.format("YYYY-MM-DD")}
                onClick={() => handleDateClick(day)}
                className={`p-2 text-center rounded 
                  ${selected ? "bg-blue-500 text-white" : "hover:bg-blue-100"} 
                  ${day.isSame(dayjs(), "day") ? "border border-blue-400" : ""}`}
              >
                {day.format("D")}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative p-4 w-[550px] bg-white rounded-xl shadow flex space-x-4">
        {/* Calendar content */}
        <div className="flex-1 space-y-6">
            {renderMonth(0, true)}
            {renderMonth(1, false)}

            {/* Selected range output */}
            <div className="text-center text-sm text-gray-700">
            {range.start && !range.end && <p>Start: {range.start.format("MMM D, YYYY")} (Select an end date)</p>}
            {range.start && range.end && (
                <p>
                From {range.start.format("MMM D, YYYY")} to {range.end.format("MMM D, YYYY")}
                </p>
            )}
            </div>
        </div>

        {/* Vertical navigation arrows */}
        <div className="flex flex-col items-center justify-center space-y-4">
            <button
            type="button"
            onClick={() => setMonthOffset((prev) => prev - 1)}
            className="p-3 rounded-lg hover:bg-gray-100 w-12 h-12 flex items-center justify-center text-xl"
            >
            ↑
            </button>
            <button
            type="button"
            onClick={() => setMonthOffset((prev) => prev + 1)}
            className="p-3 rounded-lg hover:bg-gray-100 w-12 h-12 flex items-center justify-center text-xl"
            >
            ↓
            </button>
        </div>
    </div>
  );
};

export default CalendarRangePicker;
