import { db } from './firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

// Fetch trips from Firestore for a specific user
export const getUserTrips = async (userId) => {
  console.log('Fetching trips for user: ', userId);
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
    const docRef = await addDoc(collection(db, 'Trips'), { ...tripData, userId });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};