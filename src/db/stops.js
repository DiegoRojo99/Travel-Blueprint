import { db } from '@/utils/firebase';
import { updateDoc, doc } from 'firebase/firestore';

export async function addStopToTrip(tripId, stop) {
  const trip = await getTripById(tripId);
  if (!trip) {
    throw new Error('Trip not found');
  }

  trip.stops.push(stop);
  await updateTripStops(tripId, trip.stops);

  return trip;
}

export async function updateTripStops(tripId, stops) {
  const tripRef = doc(db, 'trips', tripId);
  const updateResult = await updateDoc(tripRef, {
    stops: stops
  });

  return updateResult;
}