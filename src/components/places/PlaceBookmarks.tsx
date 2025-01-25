import React from 'react';
import PlaceItem from './PlaceItem';
import { Trip } from '@/types/trip';

const PlaceBookmarks: React.FC<{ trip: Trip }> = ({ trip }) => {
  if (!trip?.places) return null;
  return (
    <div className="my-2 flex flex-wrap -mx-2">
      {trip.places.map((place) => (
        <div key={place.place_id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
          <PlaceItem place={place} />
        </div>
      ))}
    </div>
  );
};

export default PlaceBookmarks;