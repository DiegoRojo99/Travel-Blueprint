import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import TripCard from "./TripSmallCard";

interface Trip {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
}

interface FormState {
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
}

const TripsPage = () => {
  const auth = getAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripForm, setTripForm] = useState<FormState>({
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
      console.log(tripForm);
      console.log("user", user);
      console.log("user uid", user.uid);
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
      } else {
        alert('Error creating trip.');
      }
    } else {
      alert('You must be logged in to create a trip.');
    }
  };

  useEffect(() => {
    const fetchTrips = async () => {
      const user = auth.currentUser;

      if (user) {
        const response = await fetch('/api/trips', {
          headers: { 'x-user-id': user.uid },
        });
        const data = await response.json();
        setTrips(data);
      }
    };

    fetchTrips();
  }, [auth.currentUser]);

  return (
    <div className="p-6 dark:bg-gray-900 ">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Start planning your trip</h1>

        {/* Trip Form */}
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

        {/* Trips Grid */}
        <div className="container mx-auto">
          <h2 className="text-lg font-semibold mb-4">Your Trips</h2>
          {trips.length === 0 ? (
            <p className="text-gray-600">No trips yet. Start planning!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />                
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
