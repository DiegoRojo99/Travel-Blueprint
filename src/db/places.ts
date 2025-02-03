import { GooglePlaceDetails, GoogleSearchResult } from '@/types/search';
import { db } from '@/lib/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import fetch from "node-fetch";

/**
 * Updates the places attribute of a trip object.
 * @param {string} tripId - The id of the trip object to update.
 * @param {GoogleSearchResult[]} places - The places array that is going to be updated.
 * @returns {Promise<boolean>} A boolean indicating the result of the operation.
 */
export async function updateTripPlaces(tripId: string, places: GoogleSearchResult[]): Promise<boolean> {
  const tripRef = doc(db, 'Trips', tripId);
  
  try {
    const tripDoc = await getDoc(tripRef);
    if (!tripDoc.exists()) {
      throw new Error("Trip not found");
    }

    await updateDoc(tripRef, { places: places });
    return true;
  } catch (error) {
    console.error("Error adding stop", error);
    throw error;
  }
}

/**
 * Search places using Google Places API.
 * @param {string} query - The query that will be used to search for places.
 * @returns {Promise<GoogleSearchResult[]>} An array of places found matching the query.
 */
export async function searchGooglePlaces(query: string): Promise<GoogleSearchResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.error("Failed to fetch stops from the API");
    throw new Error("Failed to fetch stops from the API");
  }

  const data = await response.json() as { results: GooglePlaceDetails[] };
  if (!data?.results) {
    console.error("No results found");
    throw new Error("No results found");
  };

  return data.results.map((result) => ({
    place_id: result.place_id,
    name: result.name,
    formatted_address: result.formatted_address,
    location: {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    },
    rating: result.rating,
    user_ratings_total: result.user_ratings_total,
    types: result.types,
    photo_reference: result.photos?.[0]?.photo_reference,
  }));
}