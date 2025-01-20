import { Stop, Trip } from "@/types/trip";
import { useState } from "react";

const StopItem = ({ stop }: { stop: Stop }) => {
  return (
    <div className="p-4 border rounded">
      <strong>{stop.name}</strong> ({stop.type})
      <div>{stop.date}</div>
      <p>{stop.notes}</p>
    </div>
  )
};

const StopsSection = ({ trip }: { trip: Trip }) => {
  const [stops, setStops] = useState<Stop[]>(trip.stops || []);
  const [newStop, setNewStop] = useState({
    name: "",
    type: "",
    date: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewStop((prevStop) => ({
      ...prevStop,
      [name]: value,
    }));
  };

  const handleAddStop = async () => {
    const res = await fetch(`/api/trips/${trip.id}/stops`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStop),
    });

    if (res.ok) {
      const addedStop = await res.json();
      setStops([...stops, addedStop]);
      setNewStop({ name: "", type: "", date: "", notes: "" });
    }
  };

  return (
    <div className="stops-section">
      <h2 className="text-xl font-bold">Stops</h2>
      <div className="space-y-4 mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stops.map((stop) => (
          <StopItem key={stop.id} stop={stop} />
        ))}
      </div>
      <form
          onSubmit={handleAddStop}
          className="bg-white text-black p-4 shadow-md rounded mb-6 max-w-lg w-full mx-auto"
      >
        <div className="add-stop-form mt-4 flex flex-col space-y-2">
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            name="name"
            placeholder="Name"
            value={newStop.name}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            name="type"
            placeholder="Type (e.g., Landmark, Restaurant)"
            value={newStop.type}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 p-2 rounded"
            type="date"
            name="date"
            value={newStop.date}
            onChange={handleInputChange}
          />
          <textarea
            className="border border-gray-300 p-2 rounded"
            name="notes"
            placeholder="Notes"
            value={newStop.notes}
            onChange={handleInputChange}
          />
          <button onClick={handleAddStop}>Add Stop</button>
        </div>
      </form>
    </div>
  );
};

export default StopsSection;