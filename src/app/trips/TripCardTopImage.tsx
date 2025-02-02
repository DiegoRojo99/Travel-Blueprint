import { Trip } from "@/types/trip";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faEllipsisH, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { City } from "@/types/cities";
import { useState } from "react";
import Image from "next/image";

const TripCardTopImage = ({ trip, handleDelete }: { trip: Trip, handleDelete: (e: React.MouseEvent) => void; }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleModalToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const imageUrl = trip.destinations?.[0].image ?? "/default-image.jpg";

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 bg-white relative">
      <Link href={`/trips/${trip.id}/details`}>
        <div className="relative">
          <Image
            src={`/api/photos?photoReference=${imageUrl}`}
            width={256}
            height={160}
            alt={trip.name}
            className="w-full h-48 object-cover"
            priority
          />
          <button
            onClick={handleModalToggle}
            className="absolute top-2 right-2 bg-white rounded-full px-1 shadow-lg hover:bg-gray-200 focus:outline-none"
          >
            <FontAwesomeIcon icon={faEllipsisH} className="text-gray-600" />
          </button>
        </div>
      </Link>

      {/* Trip Details */}
      <div className="px-4 py-2 text-left">
        <h3 className="font-bold text-black text-lg">{trip.name}</h3>
        <p className="text-gray-600 text-sm mt-2">
          {/* <FontAwesomeIcon icon={faCalendar} className="mr-1" /> */}
          {format(trip.startDate, "MMM d").toLocaleUpperCase()} - {format(trip.endDate, "MMM d").toLocaleUpperCase()}
        </p>
        <div className="flex flex-column justify-between">
          <p className="text-gray-600 text-sm mt-2">
            <FontAwesomeIcon icon={faMapPin} className="mr-1" />
            {trip.destinations.map((city: City) => city.name).join(" • ")}
          </p>
          
          {/* User Profile Pictures */}
          <div className="flex items-center justify-center mt-2 mb-2">
            {trip.users?.slice(0, 3).map((user, index) => (
              <Image
                key={index}
                src={user.photoURL ?? ''}
                alt={user.displayName}
                width={128}
                height={128}
                className="w-8 rounded-full border-2 border-white -ml-2"
              />
            ))}
            {trip.users?.length > 3 && (
              <span className="text-gray-600 text-sm">+{trip.users.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-10 right-2 bg-white shadow-lg rounded-md p-2 w-40 z-10">
          <button
            onClick={handleDelete}
            className="flex items-center w-full py-1 px-2 text-black text-left hover:bg-gray-100 rounded-md"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TripCardTopImage;