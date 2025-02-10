import { Trip } from "@/types/trip";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eachDayOfInterval } from "date-fns/fp";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import ItineraryDay from "./ItineraryDay";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { StopWithDetails } from "@/types/search";

export default function Itinerary({ trip }: { trip: Trip }) {
  const [days, setDays] = useState<string[]>([]);
  const [stops, setStops] = useState<StopWithDetails[]>(trip.stops || []);

  useEffect(() => {
    if (trip.startDate && trip.endDate) {
      const interval = eachDayOfInterval({
        start: new Date(trip.startDate),
        end: new Date(trip.endDate),
      });
      setDays(interval.map((date: Date) => format(date, "yyyy-MM-dd")));
    }
  }, [trip.startDate, trip.endDate]);

  const filterStopsByDate = (date: string) => {
    return stops.filter((stop) => stop.date === date);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeStop = stops.find((stop) => stop.id === active.id);
    let date = String(over.id);
    if (isNaN(Date.parse(date))) {
      const endStop = stops.find((stop) => stop.id === over.id);
      if(!endStop) return;
      date = endStop.date;
    }

    if (activeStop) {
      const confirmation = confirm(`Move ${activeStop.name} to ${format(new Date(date), 'EEEE, dd MMMM')}`);
      if (!confirmation) return;
      // If dropped in a different day
      if (activeStop.date !== date) {
        const updatedStop = { ...activeStop, date: date };
        try {
          await fetch(`/api/trips/${trip.id}/stops`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStop),
            })
          .then(response => { if (!response.ok) throw new Error('Network response was not ok'); });
          const newStops = stops.map((stop) => (stop.id === active.id ? updatedStop : stop));
          setStops(newStops);
        } catch (error) {
          console.error("Error updating stop:", error);
        }
      } 
      else {
        // If reordering within the same day
        const dayStops = stops.filter((stop) => stop.date === date);
        const oldIndex = dayStops.findIndex((stop) => stop.id === active.id);
        const newIndex = dayStops.findIndex((stop) => stop.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const reorderedStops = arrayMove(dayStops, oldIndex, newIndex);
          const newStops = stops.map((stop) =>
            stop.date === date ? reorderedStops.shift()! : stop
          );
          setStops(newStops);
        }
      }
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="itinerary mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Itinerary</h2>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendar} size="sm" className="text-gray-500" />
            <span>{`${format(new Date(trip.startDate), 'MMM d')} - ${format(new Date(trip.endDate), 'MMM d')}`}</span>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          {days.map((date) => (
            <ItineraryDay key={`itinerary-${date}`} date={date} stops={filterStopsByDate(date)} />
          ))}
        </div>
      </div>
    </DndContext>
  );
}