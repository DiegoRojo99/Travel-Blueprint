import { StopWithDetails } from '@/types/search';
import { db } from '@/lib/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

/**
 * Updates the stops attribute of a trip object.
 * @param {string} tripId - The id of the trip object to update.
 * @param {StopWithDetails[]} stops - The stops array that is going to be updated.
 * @returns {Promise<boolean>} A boolean indicating the result of the operation.
 */
export async function updateTripStops(tripId: string, stops: StopWithDetails[]): Promise<boolean> {
  const tripRef = doc(db, 'Trips', tripId);
  
  try {
    const tripDoc = await getDoc(tripRef);
    if (!tripDoc.exists()) {
      throw new Error("Trip not found");
    }

    await updateDoc(tripRef, { stops: stops });
    return true;
  } catch (error) {
    console.error("Error adding stop", error);
    throw error;
  }
}
