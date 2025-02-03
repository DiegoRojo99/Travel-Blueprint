import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { Trip } from "@/types/trip";

interface DateSelectorProps {
  startDate: string;
  endDate: string;
  isEditing: boolean;
  handleDateChange: (dateType: 'start' | 'end', date: string) => void;
  trip: Trip | null;
}

function DateSelector({ startDate, endDate, isEditing, handleDateChange, trip }: DateSelectorProps) {
  if(!trip?.startDate && !trip?.endDate) return <></>;
  return (
    <div className="flex items-center space-x-2 mb-1">
      <FontAwesomeIcon icon={faCalendar} size="1x" />
      {isEditing ? (
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange("start", e.target.value)}
            className="bg-transparent border-b-2 border-white text-1x sm:text-lg"
          />
          <span className="mx-2">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange("end", e.target.value)}
            className="bg-transparent border-b-2 border-white text-1x sm:text-lg"
          />
        </div>
      ) : (
        <span className="text-1x sm:text-lg">
          {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d")}
        </span>
      )}
    </div>
  );
}

export default DateSelector;