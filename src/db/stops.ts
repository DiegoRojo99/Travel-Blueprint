import { StopWithDetails } from '@/types/search';
import { db } from '@/utils/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

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
