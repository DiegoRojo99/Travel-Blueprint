import React from 'react';
import { Trip } from '@/types/trip';
import TripName from './TripName';
import DateSelector from './DateSelector';
import TripDestinations from './TripDestinations';
import { UserDB } from '@/types/users';

interface TripOverlayProps {
  isEditing: boolean;
  trip: Trip;
  setTrip: React.Dispatch<React.SetStateAction<Trip | null>>;
  handleEditToggle: () => void;
  startDate: string;
  endDate: string;
  handleDateChange: (dateType: 'start' | 'end', date: string) => void;
  setIsAddingUser: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingUser: boolean;
  handleSaveChanges: () => void;
}

const TripOverlay = ({
  isEditing,
  trip,
  setTrip,
  handleEditToggle,
  startDate,
  endDate,
  handleDateChange,
  setIsAddingUser,
  isAddingUser,
  handleSaveChanges
}: TripOverlayProps) => {
  return (
    <div className="absolute relative bg-white z-10 p-4 sm:p-6 text-black rounded-lg
      w-[90%] top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
      <TripName
        isEditing={isEditing}
        trip={trip}
        setTrip={setTrip}
        handleEditToggle={handleEditToggle}
      />

      <DateSelector
        startDate={startDate}
        endDate={endDate}
        isEditing={isEditing}
        handleDateChange={handleDateChange}
        trip={trip}
      />

      <TripDestinations 
        trip={trip} 
        setIsAddingUser={setIsAddingUser} 
        isAddingUser={isAddingUser} 
      />

      {/* Edit Buttons */}
      {isEditing && (
        <div className="mt-6">
          <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-6 py-2 rounded-md">
            Save Changes
          </button>
          <button onClick={handleEditToggle} className="bg-gray-500 text-white px-6 py-2 rounded-md ml-4">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TripOverlay;