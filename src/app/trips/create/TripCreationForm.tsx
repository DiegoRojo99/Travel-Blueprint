import { getAuth } from "firebase/auth";
import { useState } from "react";
import { TripFormState } from "@/types/trip";

const TripCreationForm = ({ onTripCreated }: { onTripCreated: (tripId: string) => void }) => {
  const auth = getAuth();
  const [tripForm, setTripForm] = useState<TripFormState>({
    name: "",
    startDate: "",
    endDate: "",
    destination: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripForm({ ...tripForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.uid,
        },
        body: JSON.stringify(tripForm),
      });

      if (response.ok) {
        alert('Trip created successfully!');
        const tripResponse = await response.json();
        onTripCreated(tripResponse.tripId);
      } else {
        alert('Error creating trip.');
      }
    } else {
      alert('You must be logged in to create a trip.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow-md rounded mb-6 max-w-lg w-full"
    >
      <h2 className="text-lg font-semibold mb-4 text-black">Create a New Trip</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Trip Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={tripForm.name}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={tripForm.startDate}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={tripForm.endDate}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-gray-700"
        >
          Destination
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={tripForm.destination}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2 text-black"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Trip
      </button>
    </form>
  );
};

export default TripCreationForm;