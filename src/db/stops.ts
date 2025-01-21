import { GoogleSearchResult } from '@/types/search';
import { Stop } from '@/types/trip';
import { db } from '@/utils/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import fetch from "node-fetch";

export async function updateTripStops(tripId: string, stops: Stop[]): Promise<boolean> {
  const tripRef = doc(db, 'Trips', tripId);
  
  try {
    let tripDoc = await getDoc(tripRef);
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

  const data = await response.json() as { results: any[] };
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
