import { Trip } from "@/types/trip";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction } from "react";

interface TripOverlayProps {
  isEditing: boolean;
  handleEditToggle: () => void;
  trip: Trip | null;
  setTrip:(value: SetStateAction<Trip | null>) => void;
}

export default function TripOverlay({handleEditToggle, isEditing, trip, setTrip}: TripOverlayProps){
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          {isEditing ? (
            <input
              type="text"
              value={trip?.name}
              onChange={(e) => setTrip(trip ? { ...trip, name: e.target.value } : null)}
              className="bg-transparent border-b-2 border-white text-xl sm:text-3xl"
            />
          ) : (
            trip?.name
          )}
        </h1>
      </div>
      <div>
        <FontAwesomeIcon icon={faPencil} size="lg" className="cursor-pointer" onClick={handleEditToggle} />
      </div>
    </div>
  )
}