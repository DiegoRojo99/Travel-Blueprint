import { Trip } from "@/types/trip";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eachDayOfInterval } from "date-fns/fp";
import { faCalendar, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { StopWithDetails } from "@/types/search";

const StopItem = ({ stop }: { stop: StopWithDetails }) => {
  return (
    <div className="p-2 border rounded flex items-center w-auto m-1">
      <div>
        <strong>{stop.name}</strong>
        <p className="mt-2 text-gray-400">{stop.notes?.length ? stop.notes : 'No notes'}</p>
      </div>
    </div>
  );
};

const ItineraryDay = ({ date, stops }: { date: string; stops: StopWithDetails[] }) => {
  const [isCollapsed, setIsCollapsed] = useState(stops.length === 0);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const stopNames = stops.map((stop) => stop.name).join(", ");

  return (
    <div className="itinerary-day mb-4">
      <div className="flex items-center cursor-pointer mb-2" onClick={toggleCollapse}>
        <FontAwesomeIcon
          icon={isCollapsed ? faChevronUp : faChevronDown}
          className="mr-2"
        />
        <h3 className="text-lg font-bold">{format(new Date(date), "EEEE, dd MMMM")}</h3>
      </div>
      {isCollapsed ? (
        <div className="text-sm text-gray-500">{stopNames}</div>
      ) : (
        <div className="flex flex-wrap">
          {stops
            .filter((stop) => stop.date === date)
            .map((stop, index) => (
              <StopItem key={`itinerary-${date}-stop-${index}`} stop={stop} />
            ))}
        </div>
      )}
    </div>
  );
};

const Itinerary = ({ trip }: { trip: Trip }) => {
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

export default Itinerary;