import { TripFormState } from "@/types/trip";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const TripCreationForm = ({ onTripCreated }: { onTripCreated: (tripId: string) => void }) => {
  const auth = getAuth();

  const [cityQuery, setCityQuery] = useState<string>("");
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [tripForm, setTripForm] = useState<TripFormState>({
    name: "",
    startDate: "",
    endDate: "",
    destinations: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripForm({ ...tripForm, [name]: value });
  };

  const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setCityQuery(query);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      if (query) {
        fetchCities(query);
      }
    }, 600);
    setDebounceTimeout(newTimeout);
  };

  const fetchCities = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cities/search?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setCities(data || []);
      } 
      else {
        setCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
    setLoading(false);
  };

  const handleCitySelect = (city: { id: string; name: string }) => {
    if (!tripForm.destinations.includes(city.name)) {
      setTripForm((prev) => ({
        ...prev,
        destinations: [...prev.destinations, city.name],
      }));
    }

    setCityQuery("");
    setCities([]);
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
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
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
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
        <label htmlFor="citySearch" className="block text-sm font-medium text-gray-700">
          Search Cities
        </label>
        <input
          type="text"
          id="citySearch"
          value={cityQuery}
          onChange={handleCitySearch}
          placeholder="Type a city name..."
          className="w-full border rounded px-3 py-2 text-black"
        />
        {loading && <p className="text-gray-700 text-sm mt-2">Searching...</p>}
        {cities.length > 0 && (
          <ul className="border rounded mt-2 bg-white shadow-lg max-h-40 overflow-y-auto">
            {cities.map((city) => (
              <li
                key={city.id}
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                onClick={() => handleCitySelect(city)}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="destinations" className="block text-sm font-medium text-gray-700">
          Destinations
        </label>
        <ul className="w-full border rounded px-3 py-2 bg-gray-50 text-black">
          {tripForm.destinations.map((destination, index) => (
            <li key={index} className="py-1">
              {destination}
            </li>
          ))}
        </ul>
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