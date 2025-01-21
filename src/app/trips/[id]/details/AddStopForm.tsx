import React, { useState } from "react";
import { Stop, Trip } from "@/types/trip";

const AddStopForm = ({ trip, onStopAdded }: { trip: Trip, onStopAdded: (stop: Stop) => void }) => {
  const [newStop, setNewStop] = useState({
    name: "",
    type: "",
    date: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStop((prevStop) => ({
      ...prevStop,
      [name]: value,
    }));
  };

  const handleAddStop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStop.type) {
      setError("Please select a type.");
      return;
    }
    setError("");

    try {
      const res = await fetch(`/api/trips/${trip.id}/stops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStop),
      });

      if (res.ok) {
        const addedStop = await res.json();
        onStopAdded(addedStop);
        setNewStop({ name: "", type: "", date: "", notes: "" });
      } 
      else {
        throw new Error("Failed to add stop");
      }
    } catch (error) {
      console.error("Error adding stop:", error);
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
        <select
          className="border border-gray-300 p-2 rounded"
          name="type"
          value={newStop.type}
          onChange={handleInputChange}
        >
          <option value="">Select Type</option>
          <option value="Landmark">Landmark</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Theme Park">Theme Park</option>
          <option value="Museum">Museum</option>
          <option value="Park">Park</option>
        </select>
        {error && <div className="text-red-500">{error}</div>}
        <input
          className="border border-gray-300 p-2 rounded"
          type="date"
          name="date"
          value={newStop.date}
          onChange={handleInputChange}
          min={trip.startDate}
          max={trip.endDate}
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