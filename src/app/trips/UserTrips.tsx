import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import TripCard from "./TripSmallCard";
import { Trip } from "@/types/trip";
import Loader from "@/components/loaders/Loader";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const UserTrips = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);

  const deleteTrip = async (tripId: string) => {
    const user = auth.currentUser;
    if (user) {
      let deleteCheck = confirm("Are you sure you want to delete this trip?");
      if(!deleteCheck) return;
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': user.uid,
        },
      });

      if (response.ok) {
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      } 
      else {
        console.error("Failed to delete the trip");
      }
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
        setLoading(false);
      }
    };

    fetchTrips();
  }, [auth.currentUser]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Trips</h2>
        <Link href="/trips/create">
          <FontAwesomeIcon icon={faPlus} size="2xl" className="text-gray-500 cursor-pointer" />
        </Link>
      </div>
      {loading && <Loader />}
      {!loading && (
        !trips.length ? (
          <p className="text-gray-600">No trips yet. Start planning!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trips.map((trip) => (
              <div key={trip.id} className="relative">
                <TripCard trip={trip} />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  size="lg"
                  className="text-red-500 cursor-pointer absolute top-4 right-4"
                  onClick={() => deleteTrip(trip.id)}
                />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default UserTrips;