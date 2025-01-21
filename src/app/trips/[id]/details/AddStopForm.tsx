import { Stop } from "@/types/trip";
import { useState } from "react";

const AddStopForm = ({ tripId, onStopAdded }: { tripId: string, onStopAdded: (stop: Stop) => void }) => {
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

  const handleAddStop = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/trips/${tripId}/stops`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStop),
    });

    if (res.ok) {
      const addedStop = await res.json();
      onStopAdded(addedStop);
      setNewStop({ name: "", type: "", date: "", notes: "" });
    }
  };

  return (
    <form onSubmit={handleAddStop} className="bg-white text-black p-4 shadow-md rounded mb-6 max-w-lg w-full mx-auto">
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
        <button type="submit" className="border border-gray-300 p-2 rounded">Add Stop</button>
      </div>
    </form>
  );
};

export default AddStopForm;