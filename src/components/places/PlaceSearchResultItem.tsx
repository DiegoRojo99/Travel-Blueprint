import { GoogleSearchResult } from '@/types/search';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface PlaceSearchResultItemProps {
  result: GoogleSearchResult;
  onSelect: (stop: GoogleSearchResult) => void;
}

export const PlaceSearchResultItem: React.FC<PlaceSearchResultItemProps> = ({
  result,
  onSelect,
}) => {
  return (
    <li
      className="px-4 py-3 cursor-pointer hover:bg-gray-100"
      onClick={() => onSelect(result)}
    >
      <div className="font-semibold text-gray-800">{result.name}</div>
      <div className="text-sm text-gray-600">{result.formatted_address}</div>
      {result.rating !== undefined && (
        <div className="text-sm text-gray-500">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <span className="ml-1">{result.rating}</span>
        </div>
      )}
    </li>
  );
};
