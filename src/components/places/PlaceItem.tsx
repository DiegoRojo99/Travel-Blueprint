import React from 'react';
import { GoogleSearchResult } from '@/types/search';
import Image from 'next/image';

interface PlaceItemProps {
  place: GoogleSearchResult;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  return (
    <div className="p-4 bg-gray-100 border rounded-lg mb-4 flex flex-col sm:flex-row items-center sm:items-start">
      <div className="flex-grow">
        <div className="font-semibold text-gray-800">{place.name}</div>
        {/* <div className="text-sm text-gray-600">{place.formatted_address}</div> */}
        {/* {place.rating !== undefined && (
          <div className="text-sm text-gray-500">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            <span className="ml-1">{place.rating}</span>
          </div>
        )} */}
        <div className="text-sm text-gray-600 mt-2">{ "No description available."}</div>
      </div>
      {place.photo_reference && (
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
          alt={place.name}
          width={100}
          height={100}
          className="object-cover rounded-lg ml-4 mt-4 sm:mt-0"
        />
      )}
    </div>
  );
};

export default PlaceItem;