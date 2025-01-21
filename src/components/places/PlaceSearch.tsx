import { GoogleSearchResult } from '@/types/search';
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Trip } from '@/types/trip';
import { PlaceSearchResultItem } from './PlaceSearchResultItem';

interface PlaceSearchProps {
  onStopSelected: (selectedStop: GoogleSearchResult) => void;
  trip: Trip;
}

export const PlaceSearch: React.FC<PlaceSearchProps> = ({ onStopSelected, trip }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GoogleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleSearch = async () => {
    if (!query.trim()) return;
    const user = auth.currentUser;

    if(!user){
      alert('You must be logged in to search for a place.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/stops/search?query=${encodeURIComponent(query)}`,
        { headers: { 'x-user-id': user.uid, } }
      );
      const data: GoogleSearchResult[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (place: GoogleSearchResult) => {
    try {
      const res = await fetch(`/api/trips/${trip.id}/places`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(place),
      });

      if (res.ok) {
        const addedPlace = await res.json();
        onStopSelected(addedPlace);
        setQuery('');
        setResults([]);
      } 
      else {
        throw new Error("Failed to add stop");
      }
    } catch (error) {
      console.error("Error adding stop:", error);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex border border-gray-300 rounded-md shadow-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place..."
          className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 bg-blue-500 text-white font-medium rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          🔍
        </button>
      </div>

      {loading && (
        <div className="mt-2 text-center text-gray-500">Loading Results...</div>
      )}

      {results.length > 0 && (
        <ul className="absolute top-full w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
          {results.map((result) => (
            <PlaceSearchResultItem
              key={result.place_id}
              result={result}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
