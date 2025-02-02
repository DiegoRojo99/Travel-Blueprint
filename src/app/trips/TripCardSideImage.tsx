import { Trip } from "@/types/trip";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faEllipsisH, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { City } from "@/types/cities";
import { useState } from "react";
import Image from "next/image";
import UserProfiles from "@/components/users/UsersProfiles";

const TripCardSideImage = ({ trip, handleDelete }: { trip: Trip, handleDelete: (e: React.MouseEvent) => void; }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleModalToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const imageUrl = trip.destinations?.[0].image ?? '';

  return (
    <div className="flex rounded overflow-hidden shadow-lg border border-gray-200 bg-white relative">
      <Link href={`/trips/${trip.id}/details`}>
        <div className="relative">
          <Image
            src={`/api/photos?photoReference=${imageUrl}`}
            width={256}
            height={160}
            alt={trip.name}
            className="w-28 h-40 sm:w-36 sm:h-40 object-cover"
            priority
          />
        </div>
      </Link>

      {/* Trip Details */}
      <div className="px-4 py-2 text-left w-full">
        <div className="flex">
          <p className="text-gray-600 text-sm mt-1">
            {format(trip.startDate, "MMM d").toLocaleUpperCase()} - {format(trip.endDate, "MMM d").toLocaleUpperCase()}
          </p>
          <button
            onClick={handleModalToggle}
            className="absolute top-2 right-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none text-gray-600 hover:text-white"
          >
            <FontAwesomeIcon icon={faEllipsisH} className="px-1" />
          </button>
        </div>
        <Link href={`/trips/${trip.id}/details`}>
          <h3 className="font-bold text-black text-lg mt-2">{trip.name}</h3>
          <p className="text-gray-600 text-sm mt-1 mb-4">
            <FontAwesomeIcon icon={faMapPin} className="mr-1" />
            {trip.destinations.map((city: City) => city.name).join(" • ")}
          </p>
          <UserProfiles users={trip.users} />
        </Link>
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

export default TripCardSideImage;