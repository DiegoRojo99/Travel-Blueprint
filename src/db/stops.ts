import { Stop } from '@/types/trip';
import { db } from '@/utils/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

export async function updateTripStops(tripId: string, stops: Stop[]): Promise<boolean> {
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
