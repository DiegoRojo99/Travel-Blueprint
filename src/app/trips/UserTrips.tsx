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

  const memoizedGetToken = useCallback(() => getToken(), [getToken]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchTrips = async () => {
        console.log('User:', user);
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
          setLoading(false);
        } catch (error) {
          console.error('Error fetching trips:', error);
        }
      };

      fetchTrips();
    }, 1000); // 1 second delay

    return () => clearTimeout(timeoutId);
  }, [user]);
  useEffect(() => {
    const fetchTrips = async () => {
      console.log('User:', user);
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    if(user){
      fetchTrips();
    }
    else {
      const timeoutId = setTimeout(() => {

        fetchTrips();
      }, 800);
      return () => clearTimeout(timeoutId);
    }

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
        !user ? (
          <p className="text-gray-600">User is not logged in!</p>
        ) :
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