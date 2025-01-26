import React, { useState } from 'react';
import PlaceBookmarks from './PlaceBookmarks';
import { PlaceSearch } from './PlaceSearch';
import { GoogleSearchResult, StopWithDetails } from '@/types/search';
import { Trip } from '@/types/trip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface PlaceSectionProps {
  trip: Trip
  onPlaceAdded: (selectedPlace: GoogleSearchResult) => void;
  onStopAdded: (selectedStop: StopWithDetails) => void;
}

const PlaceSection: React.FC<PlaceSectionProps> = ({ trip, onPlaceAdded, onStopAdded }) => {
  const [isOpen, setIsOpen] = useState(true);

  function addSearchItem(item: GoogleSearchResult | StopWithDetails) {
    if (!item) return;
    if (typeof item === 'object' && 'date' in item) {
      onStopAdded(item);
    } 
    else {
      onPlaceAdded(item);
    }
  }

  if (!trip) return null;

  return (
    <div className="my-6">
      <div className="flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="mr-2">
          {isOpen ? 
            <FontAwesomeIcon icon={faChevronUp} /> : 
            <FontAwesomeIcon icon={faChevronDown} />
          }
        </span>
        <h2 className="text-lg font-bold">Places to visit</h2>
      </div>
      <>
        {isOpen && <PlaceBookmarks trip={trip} />}
        <PlaceSearch
          trip={trip}
          addSearchItem={addSearchItem}
        />
      </>
    </div>
  );
};

export default PlaceSection;