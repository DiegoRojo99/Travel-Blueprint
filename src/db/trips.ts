import { Trip } from '@/types/trip';
import { db } from '@/utils/firebase';
import { collection, getDocs, addDoc, query, where, getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';


function TripDTO (data: any): Trip {
  return {
    id: data.id,
    name: data.name,
    startDate: data.startDate,
    endDate: data.endDate,
    destination: data.destination,
    stops: data.stops,
    places: data.places,
  };
}

// Fetch trips from Firestore for a specific user
export const getUserTrips = async (userId: string): Promise<Trip[]> => {
  const tripsQuery = query(collection(db, 'Trips'), where('userId', '==', userId));
  const querySnapshot = await getDocs(tripsQuery);
  const trips: Trip[] = [];
  querySnapshot.forEach((doc) => {
    let trip = TripDTO(doc.data());
    trips.push(trip);
  });
  return trips;
};

// Fetch trips from Firestore
export const getTrips = async (): Promise<Trip[]> => {
  const querySnapshot = await getDocs(collection(db, 'Trips'));
  const trips: Trip[] = [];
  querySnapshot.forEach((doc) => {
    let trip = TripDTO(doc.data());
    trips.push(trip);
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
  const tripRef = doc(db, 'Trips', id);
  const tripSnapshot = await getDoc(tripRef);

  if (tripSnapshot.exists()) {
    const data = tripSnapshot.data();
    return TripDTO(data);
  } else {
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