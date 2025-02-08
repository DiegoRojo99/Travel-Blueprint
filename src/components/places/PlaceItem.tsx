import React from 'react';
import { StopWithDetails } from '@/types/search';
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TripPlace } from '@/types/trip';

interface PlaceItemProps {
  place: TripPlace | StopWithDetails;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: place.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-1 bg-gray-100 border rounded-lg mb-4 flex flex-row items-start h-full"
    >
      <div className="flex-grow h-full p-2 flex flex-col">
        <div className="font-semibold text-gray-800">{place.name}</div>
        <div className="text-sm text-gray-600 mt-2">
          {'notes' in place ? place.notes ? place.notes : "No notes" : "No description available."}
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