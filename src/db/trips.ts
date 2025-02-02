import { Trip, TripDocument } from '@/types/trip';
import { db } from '@/utils/firebase';
import { collection, getDocs, addDoc, query, where, getDoc, updateDoc, doc, deleteDoc, arrayUnion } from 'firebase/firestore';

/**
 * Fetch trips from Firestore for a specific user
 * @param {string} userId - The id of the user that is fetching the trips.
 * @returns {Promise<Trip[]>} A trip array indicating the result of the operation.
 */
export const getUserTrips = async (userId: string): Promise<Trip[]> => {
  const tripsQuery = query(
    collection(db, 'Trips'),
    where('users', 'array-contains', { uid: userId })
  );  
  const querySnapshot = await getDocs(tripsQuery);
  const trips: Trip[] = [];
  querySnapshot.forEach((doc) => {
    const trip = doc.data() as TripDocument;
    trips.push({ id: doc.id, ...trip, users: trip.users || [] });
  });
  return trips;
};

/**
 * Fetch all trips from Firestore
 * @returns {Promise<Trip[]>} A trip array indicating the result of the operation.
 */
export const getTrips = async (): Promise<Trip[]> => {
  const querySnapshot = await getDocs(collection(db, 'Trips'));
  const trips: Trip[] = [];
  querySnapshot.forEach((doc) => {
    const trip = doc.data() as TripDocument;
    trips.push({ id: doc.id, ...trip, users: trip.users || []  });
  });
  return trips;
};

/**
 * Add a new trip associated with a user
 * @param {string} userId - The id of the user that is adding the trip.
 * @param {Trip} tripData - The data of the trip being added.
 * @returns {Promise<string>} A message showing the result of the operation.
 */
export const addTrip = async (tripData: Trip, userId: string): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'Trips'), { ...tripData, userId });
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Error adding document');
  }
};

/**
 * Fetch a specific trip
 * @param {string} id - The id of the trip that is being fetched.
 * @returns {Promise<Trip>} The data from the trip being fetched.
 */
export const getTripById = async (id: string): Promise<Trip> => {
  if(!id){
    throw new Error("Trip ID not provided");
  }
  const tripRef = doc(db, 'Trips', id);
  const tripSnapshot = await getDoc(tripRef);

  if (tripSnapshot.exists()) {
    const data = tripSnapshot.data() as TripDocument;
    return { id: id, ...data, users: data.users || [] };
  } 
  else {
    throw new Error("Trip not found");
  }
};

/**
 * Update a trip's details
 * @param {string} id - The id of the trip that is being updated.
 * @param {Trip} updatedData - The data of the trip being updated.
 * @returns {Promise<Trip>} The trip object after being updated.
 */
export const updateTrip = async (id: string, updatedData: Trip): Promise<Trip> => {
  const tripRef = doc(db, 'Trips', id);
  await updateDoc(tripRef, { ...updatedData });
  return { ...updatedData };
};

/**
 * Delete a trip
 * @param {string} id - The id of the trip being deleted.
 * @returns {Promise<boolean>} A boolean indicating whether the deletion was successful.
 */
export const deleteTrip = async (id: string): Promise<boolean> => {
  try {
    const tripRef = doc(db, 'Trips', id);
    await deleteDoc(tripRef);
    return true;
  } 
  catch (error) {
    console.error('Error deleting trip:', error);
    throw new Error('Failed to delete trip');
  }
};

/**
 * Adds a user to a trip in Firestore.
 * @param {string} tripId - The ID of the trip document.
 * @param {string} userId - The ID of the user to add.
 */
export const addUserToTrip = async (tripId: string, userId: string) => {
  const tripRef = doc(db, 'Trips', tripId);

  try {
    await updateDoc(tripRef, {
      users: arrayUnion(userId),
    });
    console.log(`User ${userId} added to trip ${tripId}.`);
  } 
  catch (error: unknown) {
    console.error("Error adding user to trip:", error);
  }
};