import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Trip } from "@/types/trip";
import UserProfiles from "@/components/users/UsersProfiles";

interface TripDestinationsProps {
  trip: Trip | null;
  setIsAddingUser: (value: boolean) => void;
  isAddingUser: boolean;
}

const TripDestinations: React.FC<TripDestinationsProps> = ({ trip, setIsAddingUser, isAddingUser }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faMapPin} size="lg" />
        <span>
          {trip?.destinations && trip?.destinations?.slice(0, 3).map((city) => city.name).join(" • ")}
          {trip?.destinations && trip.destinations.length > 3 && ` • +${trip.destinations.length - 3}`}
        </span>
      </div>
      <div className="flex">
        <UserProfiles users={trip?.users} />
        <FontAwesomeIcon
          icon={faUserPlus}
          size="lg"
          className="cursor-pointer my-auto ml-2"
          onClick={() => setIsAddingUser(!isAddingUser)}
        />
      </div>
    </div>
  );
};

export default TripDestinations;