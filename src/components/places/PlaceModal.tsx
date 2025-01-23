import React, { useState } from 'react';
import { GoogleSearchResult } from '@/types/search';
import { Trip } from '@/types/trip';

interface PlaceModalProps {
  trip: Trip;
  place: GoogleSearchResult;
  onClose: () => void;
  onSave: (place: GoogleSearchResult, notes: string, date: string, isBookmarkOnly: boolean) => void;
}

export const PlaceModal: React.FC<PlaceModalProps> = ({ trip, place, onClose, onSave }) => {
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  const handleSave = (bookmarkOnly: boolean) => {
    if(!bookmarkOnly && !date) {
      alert('Please select a date.');
      return;
    }
    onSave(place, notes, date, bookmarkOnly);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-4">Save Place</h2>
        <p className="text-gray-700 mb-2">{place.name}</p>
        <p className="text-gray-500 mb-4">{place.formatted_address}</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes..."
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          min={trip.startDate}
          max={trip.endDate}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => handleSave(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-yellow-600"
          >
            Bookmark
          </button>
          <button
            onClick={() => handleSave(false)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};