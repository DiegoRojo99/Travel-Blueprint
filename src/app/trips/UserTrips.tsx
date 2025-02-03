import { useCallback, useEffect, useState } from "react";
import TripCard from "./TripCardSideImage";
import { Trip } from "@/types/trip";
import Loader from "@/components/loaders/Loader";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { sendRequestWithToken } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

const UserTrips = () => {
  const {user, getToken} = useAuth();
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);

  const deleteTrip = async (tripId: string) => {
    if (user) {
      const deleteCheck = confirm("Are you sure you want to delete this trip?");
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

  const memoizedGetToken = useCallback(() => getToken(), [getToken])
  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) {
        console.log('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const data = await sendRequestWithToken('/api/trips', memoizedGetToken, {
          method: 'GET',
        });
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map((trip) => (
              <div key={trip.id} className="relative">
                <TripCard trip={trip} handleDelete={() => deleteTrip(trip.id)} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default UserTrips;