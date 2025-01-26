import { City } from "@/types/cities";
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Save a city to the Cities collection in Firestore only if it doesn't already exist.
 * @param {City} city - The city object to save.
 * @returns {Promise<string>} A message indicating the result of the operation.
 */
export async function saveCityToFirestore(city: City): Promise<string> {
  const { id, name, location, image } = city;

  if (!id || !name || !location) {
    throw new Error("City object is missing required fields: id, name, or location");
  }

  try {
    const cityDocRef = doc(db, "Cities", id);

    // Check if the city already exists
    const cityDocSnap = await getDoc(cityDocRef);
    if (cityDocSnap.exists()) {
      return `City with ID ${id} already exists in Firestore.`;
    }

    await setDoc(cityDocRef, {
      name,
      location,
      image: image || null,
    });

    return `City ${name} successfully saved to Firestore.`;
  } 
  catch (error) {
    console.error("Error saving city to Firestore:", error);
    throw new Error("Failed to save city to Firestore.");
  }
}
/**
 * Save a city to the Cities collection in Firestore only if it doesn't already exist.
 * @param {City[]} cities - The city object to save.
 * @returns {Promise<string>} A message indicating the result of the operation.
 */
export async function saveCitiesToFirestore(cities: City[]): Promise<string> {
  if(!cities.length){
    return 'No cities';
  }

  try {
    cities.forEach(async (city: City) => {
      await saveCityToFirestore(city);
    });
    return 'Cities saved';
  }
  catch (error) {
    console.error("Error saving cities to Firestore:", error);
    return 'Error saving cities to Firestore';
  }
}