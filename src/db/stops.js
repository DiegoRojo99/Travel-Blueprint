import { db } from '@/utils/firebase';
import { updateDoc, doc } from 'firebase/firestore';

export async function addStopToTrip(tripId, stop) {
  const trip = await getTripById(tripId);
  if (!trip) {
    throw new Error('Trip not found');
  }

  if (!trip.stops) {
    await updateDoc(tripRef, { stops: [] });
  }

  const updatedStops = [...tripData.stops, stopData];
  await updateDoc(tripRef, { stops: updatedStops });

  if (!updateResult) {
    throw new Error('Error adding stop');
  }
  return trip;
}

export async function updateTripStops(tripId, stops) {
  const tripRef = doc(db, 'trips', tripId);
  if (!tripRef) {
    throw new Error('Trip not found');
  }
  console.log("Trip Ref found");

  const updateResult = await updateDoc(tripRef, {
    stops: stops
  });
  if (!updateResult) {
    console.error('Error updating stops');
    throw new Error('Error updating stops');
  }
  console.log("Update Result", updateResult);
  return updateResult;
}