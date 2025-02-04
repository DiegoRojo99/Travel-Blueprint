import { StopWithDetails } from '@/types/search';
import { adminDB } from '@/lib/firebaseAdmin';

/**
 * Updates the stops attribute of a trip object.
 * @param {string} tripId - The id of the trip object to update.
 * @param {StopWithDetails[]} stops - The stops array that is going to be updated.
 * @returns {Promise<boolean>} A boolean indicating the result of the operation.
 */
export async function updateTripStops(tripId: string, stops: StopWithDetails[]): Promise<boolean> {
  const tripRef = adminDB.collection('Trips').doc(tripId);

  try {
    const tripDoc = await tripRef.get();
    if (!tripDoc.exists) {
      throw new Error("Trip not found");
    }

    await tripRef.update({ stops: stops });
    return true;
  } catch (error) {
    console.error("Error updating stops", error);
    throw error;
  }
}

