import { Trip } from "@/types/trip";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapPin, faEllipsisH, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { City } from "@/types/cities";
import { useState } from "react";
import Image from "next/image";

const TripSmallCard = ({ trip, handleDelete }: { trip: Trip, handleDelete: (e: React.MouseEvent) => void; }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleModalToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const imageUrl = trip.destinations?.[0].image ?? "/default-image.jpg";
  
  return (
    <div className="relative bg-gray-100 rounded shadow-md flex flex-col text-black transform transition-transform hover:-translate-y-2 hover:shadow-lg">
      <Link href={`/trips/${trip.id}/details`}>
        <div className="relative">
          <Image
            src={`/api/photos?photoReference=${imageUrl}`}
            width={100}
            height={100}
            alt={trip.name} 
            className="w-full h-40 object-cover rounded-md" 
            priority
          />
          <button
            onClick={handleModalToggle}
            className="absolute top-2 right-2 bg-white rounded-full px-1 shadow-lg hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faEllipsisH} className="text-gray-600" />
          </button>
        </div>
      </Link>

      {/* Trip Details */}
      <span className="font-semibold text-center mt-2">{trip.name}</span>
      <span className="mt-2 text-sm pl-2">
        <FontAwesomeIcon icon={faCalendar} size="sm" className="text-gray-500 mr-1" />
        {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d")}
      </span>
      <span className="mt-2 text-sm pl-2 pb-2">
        <FontAwesomeIcon icon={faMapPin} size="1x" className="text-gray-500 mr-1" />
        {trip.destinations.map((city: City) => city.name).join(" • ")}
      </span>

      
      {showDropdown && (
        <div className="absolute top-8 right-2 bg-white shadow-lg rounded-md p-2 w-40 z-10">
          <button
            onClick={handleDelete}
            className="flex items-center w-full py-1 px-2 text-left hover:bg-gray-100 rounded-md"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TripSmallCard;