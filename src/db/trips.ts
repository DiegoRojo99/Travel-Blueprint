import { Trip, TripDocument } from '@/types/trip';
import { UserDB } from '@/types/users';
import { adminDB } from '@/lib/firebaseAdmin';
import { firestore } from 'firebase-admin';

/**
 * Fetch trips from Firestore for a specific user
 * @param {string} userId - The id of the user that is fetching the trips.
 * @returns {Promise<Trip[]>} A trip array indicating the result of the operation.
 */
export const getUserTrips = async (userId: string): Promise<Trip[]> => {
  const tripsRef = adminDB.collection('Trips');
  const tripsQuery = tripsRef.where('userIds', 'array-contains', userId);
  const tripsSnapshot = await tripsQuery.get();
  const trips: Trip[] = tripsSnapshot.docs.map(doc => {
    const trip = doc.data() as TripDocument;
    return { id: doc.id, ...trip };
  });

  return trips;
};

/**
 * Add a new trip associated with a user
 * @param {Trip} tripData - The data of the trip being added.
 * @returns {Promise<string>} A message showing the result of the operation.
 */
export const addTrip = async (tripData: Trip): Promise<string> => {
  try {
    const docRef = await adminDB.collection('Trips').add(tripData);
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
  const tripsRef = adminDB.collection('Trips').doc(id)
  const tripSnapshot = await tripsRef.get();

  if (!tripSnapshot.exists) {
    throw new Error("Trip not found");
  } 
  console.log("Trip Snap:", tripSnapshot);
  const data = tripSnapshot.data() as unknown as TripDocument;
  return { id: id, ...data };
};

/**
 * Update a trip's details
 * @param {string} id - The id of the trip that is being updated.
 * @param {Trip} updatedData - The data of the trip being updated.
 * @returns {Promise<Trip>} The trip object after being updated.
 */
export const updateTrip = async (id: string, updatedData: Trip): Promise<Trip> => {
  const tripRef = adminDB.collection('Trips').doc(id);
  await tripRef.update({ ...updatedData });
  return { ...updatedData };
};

/**
 * Delete a trip
 * @param {string} id - The id of the trip being deleted.
 * @returns {Promise<boolean>} A boolean indicating whether the deletion was successful.
 */
export const deleteTrip = async (id: string): Promise<boolean> => {
  try {
    const tripRef = adminDB.collection("Trips").doc(id);
    await tripRef.delete();
    return true;
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw new Error("Failed to delete trip");
  }
};

/**
 * Adds a user to a trip in Firestore.
 * @param {string} tripId - The ID of the trip document.
 * @param {string} userId - The ID of the user to add.
 * @param {string} role - The role the user to add(Owner, Member, Viewer).
 */
export const addUserToTrip = async (tripId: string, userId: string, role: string): Promise<boolean> => {
  try {
    const tripsRef = adminDB.collection("Trips");
    const tripsQuery = tripsRef.where("id", "==", tripId);
    const tripsSnapshot = await tripsQuery.get();

    if (tripsSnapshot.empty) {
      console.error("Trip not found");
      return false;
    }

    const tripDoc = tripsSnapshot.docs[0];
    const tripRef = tripDoc.ref;

    const userRef = adminDB.collection("Users");
    const userQuery = userRef.where("id", "==", userId);
    const userSnapshot = await userQuery.get();

    if (userSnapshot.empty) {
      console.error("User not found");
      return false;
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data() as UserDB;

    const user = {
      uid: userData.id,
      displayName: userData.name,
      photoURL: userData.profilePicture,
      email: userData.email,
      role: role,
    };

    await tripRef.update({
      users: firestore.FieldValue.arrayUnion(user),
    });

    return true;
  } catch (error) {
    console.error("Error adding user to trip:", error);
    return false;
  }
};
