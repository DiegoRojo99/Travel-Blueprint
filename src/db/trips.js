import { db } from '@/utils/firebase';
import { collection, getDocs, addDoc, query, where, getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Fetch trips from Firestore for a specific user
export const getUserTrips = async (userId) => {
  const tripsQuery = query(collection(db, 'Trips'), where('userId', '==', userId));
  const querySnapshot = await getDocs(tripsQuery);
  const trips = [];
  querySnapshot.forEach((doc) => {
    trips.push({ id: doc.id, ...doc.data() });
  });
  return trips;
};

// Fetch trips from Firestore
export const getTrips = async () => {
  const querySnapshot = await getDocs(collection(db, 'Trips'));
  const trips = [];
  querySnapshot.forEach((doc) => {
    trips.push({ id: doc.id, ...doc.data() });
  });
  return trips;
};

// Add a new trip associated with a user
export const addTrip = async (tripData, userId) => {
  try {
    await addDoc(collection(db, 'Trips'), { ...tripData, userId });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
export const getTripById = async (id) => {
  const tripRef = doc(db, 'Trips', id);
  const tripSnapshot = await getDoc(tripRef);

  if (tripSnapshot.exists()) {
    return { id: tripSnapshot.id, ...tripSnapshot.data() };
  } else {
    throw new Error("Trip not found");
  }
};

// Update a trip's details
export const updateTrip = async (id, updatedData) => {
  const tripRef = doc(db, 'Trips', id);
  await updateDoc(tripRef, updatedData);
  return { id, ...updatedData };
};

// Delete a trip
export const deleteTrip = async (id) => {
  const tripRef = doc(db, 'Trips', id);
  await deleteDoc(tripRef);
  return id;
};