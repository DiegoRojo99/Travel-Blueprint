import React from 'react';
import { GoogleSearchResult } from '@/types/search';
import Image from 'next/image';

interface PlaceItemProps {
  place: GoogleSearchResult;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  return (
    <div className="p-1 bg-gray-100 border rounded-lg mb-4 flex flex-row items-start h-full">
      <div className="flex-grow h-full p-2 flex flex-col">
        <div className="font-semibold text-gray-800">{place.name}</div>
        <div className="text-sm text-gray-600 mt-2">{"No description available."}</div>
        <div className="flex items-center mt-2 space-x-1 mt-auto">
          {/* <FontAwesomeIcon icon={faClock} size="lg" className="text-gray-500 mr-1" /> */}
        </div>
      </div>
      {place.photo_reference && (
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
          alt={place.name}
          width={75}
          height={100}
          className="object-cover rounded-lg m-auto"
        />
      )}
    </div>
  );
};

export default PlaceItem;