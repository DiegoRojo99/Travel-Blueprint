import { useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { StopWithDetails } from "@/types/search";
import PlaceItem from "../places/PlaceItem";

export default function ItineraryDay({ date, stops }: { date: string; stops: StopWithDetails[] }){
  const [isCollapsed, setIsCollapsed] = useState(stops.length === 0);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const stopNames = stops.length ? stops.map((stop) => stop.name).join(", ") : "No stops planned for this day";

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
        <div className="my-2 flex flex-wrap -mx-2">
          {stops
            .filter((stop) => stop.date === date)
            .map((stop, index) => (              
              <div key={`itinerary-${date}-stop-${index}`} className="w-full sm:w-1/2 px-2 mb-4">
                <PlaceItem place={stop} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};