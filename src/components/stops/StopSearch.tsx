import { GoogleSearchResult } from '@/types/search';
import React, { useState } from 'react';
import { StopSearchResultItem } from './StopSearchResultItem';
import { getAuth } from 'firebase/auth';

interface StopSearchProps {
  onStopSelected: (selectedStop: GoogleSearchResult) => void;
}

export const StopSearch: React.FC<StopSearchProps> = ({ onStopSelected }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GoogleSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
    const auth = getAuth();

  const handleSearch = async () => {
    if (!query.trim()) return;
    const user = auth.currentUser;

    if(!user){
      alert('You must be logged in to search for a stop.');
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

  const handleSelect = (stop: GoogleSearchResult) => {
    onStopSelected(stop);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex border border-gray-300 rounded-md shadow-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a stop..."
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
            <StopSearchResultItem
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
