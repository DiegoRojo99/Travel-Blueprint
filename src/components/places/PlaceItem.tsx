import React from 'react';
import { GoogleSearchResult, StopWithDetails } from '@/types/search';
import Image from 'next/image';

interface PlaceItemProps {
  place: GoogleSearchResult | StopWithDetails;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  return (
    <div className="p-1 bg-gray-100 border rounded-lg mb-4 flex flex-row items-start h-full">
      <div className="flex-grow h-full p-2 flex flex-col">
        <div className="font-semibold text-gray-800">{place.name}</div>
        <div className="text-sm text-gray-600 mt-2">
          {'notes' in place ? place.notes ? place.notes : "No notes" : "No description available."}
        </div>
        <div className="flex items-center mt-2 space-x-1 mt-auto">
          {/* <FontAwesomeIcon icon={faClock} size="lg" className="text-gray-500 mr-1" /> */}
        </div>
      </div>
      {place.photo_reference && (
        <div className='m-auto w-24 h-24 relative rounded-lg overflow-hidden'>
          <Image
            src={`/api/photos?photoReference=${place.photo_reference}`}
            alt={place.name}
            width={100}
            height={100}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      )}
    </div>
  );
};

export default PlaceItem;