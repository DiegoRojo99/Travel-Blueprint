import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Fetch trips from Firestore
export const getTrips = async () => {
  const querySnapshot = await getDocs(collection(db, 'Trips'));
  const trips = [];
  querySnapshot.forEach((doc) => {
    trips.push({ id: doc.id, ...doc.data() });
  });
  return trips;
};

// Add a new trip to Firestore
export const addTrip = async (tripData) => {
  try {
    const docRef = await addDoc(collection(db, 'Trips'), tripData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
