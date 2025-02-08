import { Trip } from "@/types/trip";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eachDayOfInterval } from "date-fns/fp";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import ItineraryDay from "./ItineraryDay";

export default function Itinerary({ trip }: { trip: Trip }){
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    if (trip.startDate && trip.endDate) {
      const interval = eachDayOfInterval({
        start: new Date(trip.startDate),
        end: new Date(trip.endDate),
      });
      setDays(interval.map((date: Date) => format(date, "yyyy-MM-dd")));
    }
  }, [trip.startDate, trip.endDate]);


  const filterStopsByDate = (date: string) => {
    return trip.stops?.filter((stop) => stop.date === date) ?? [];
  };

  return (
    <div className="itinerary mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Itinerary</h2>
        <div className="flex items-center space-x-2">
          
          <FontAwesomeIcon icon={faCalendar} size="sm" className="text-gray-500" />
          <span>{`${format(new Date(trip.startDate), 'MMM d')} - ${format(new Date(trip.endDate), 'MMM d')}`}</span>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {days.map((date) => {
          return <ItineraryDay key={`itinerary-${date}`} date={date} stops={filterStopsByDate(date)} />;
        })}
      </div>
    </div>
  );
};