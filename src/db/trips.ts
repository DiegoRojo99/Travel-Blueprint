import { Trip, TripDocument } from '@/types/trip';
import { db } from '@/utils/firebase';
import { collection, getDocs, addDoc, query, where, getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Fetch trips from Firestore for a specific user
export const getUserTrips = async (userId: string): Promise<Trip[]> => {
  const tripsQuery = query(collection(db, 'Trips'), where('userId', '==', userId));
  const querySnapshot = await getDocs(tripsQuery);
  const trips: Trip[] = [];
  querySnapshot.forEach((doc) => {
    const trip = doc.data() as TripDocument;
    trips.push({ id: doc.id, ...trip });
  });
  return trips;
};

// Fetch trips from Firestore
export const getTrips = async (): Promise<Trip[]> => {
  const querySnapshot = await getDocs(collection(db, 'Trips'));
  const trips: Trip[] = [];
  querySnapshot.forEach((doc) => {
    const trip = doc.data() as TripDocument;
    trips.push({ id: doc.id, ...trip });
  });
  return trips;
};

// Add a new trip associated with a user
export const addTrip = async (tripData: Trip, userId: string): Promise<void> => {
  try {
    await addDoc(collection(db, 'Trips'), { ...tripData, userId });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getTripById = async (id: string): Promise<Trip> => {
  if(!id){
    throw new Error("Trip ID not provided");
  }
  const tripRef = doc(db, 'Trips', id);
  const tripSnapshot = await getDoc(tripRef);

  if (tripSnapshot.exists()) {
    const data = tripSnapshot.data() as TripDocument;
    return { id: id, ...data };
  } 
  else {
    throw new Error("Trip not found");
  }
};

// Update a trip's details
export const updateTrip = async (id: string, updatedData: Trip): Promise<Trip> => {
  const tripRef = doc(db, 'Trips', id);
  await updateDoc(tripRef, { ...updatedData });
  return { ...updatedData };
};

// Delete a trip
export const deleteTrip = async (id: string): Promise<string> => {
  const tripRef = doc(db, 'Trips', id);
  await deleteDoc(tripRef);
  return id;
};