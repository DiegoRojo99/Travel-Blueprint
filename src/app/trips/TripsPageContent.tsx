import { useState } from "react";

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
  const [trips, setTrips] = useState<Trip[]>([]);
  const [form, setForm] = useState<FormState>({
    name: "",
    startDate: "",
    endDate: "",
    destination: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreateTrip = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    const newTrip = {
      id: Date.now(), // Temporary ID, replace with backend-generated ID
      ...form,
    };
    setTrips([...trips, newTrip]);
    setForm({ name: "", startDate: "", endDate: "", destination: "" });
  };

  return (
    <div className="p-6 dark:bg-gray-900 ">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Start planning your trip</h1>

        {/* Trip Form */}
        <form
          onSubmit={handleCreateTrip}
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
              value={form.name}
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
              value={form.startDate}
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
              value={form.endDate}
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
              value={form.destination}
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

        {/* Trips List */}
        <div className="container mx-auto">
          <h2 className="text-lg font-semibold mb-4">Your Trips</h2>
          {trips.length === 0 ? (
            <p className="text-gray-600">No trips yet. Start planning!</p>
          ) : (
            <ul className="space-y-4">
              {trips.map((trip) => (
                <li
                  key={trip.id}
                  className="bg-gray-100 p-4 rounded shadow-md flex flex-col gap-2"
                >
                  <span className="font-semibold">{trip.name}</span>
                  <span>
                    {trip.startDate} - {trip.endDate}
                  </span>
                  <span>{trip.destination}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
