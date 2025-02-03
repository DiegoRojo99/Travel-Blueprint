import fetch from 'node-fetch';

export async function fetchGooglePhoto(photoReference) {
  const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const MAX_WIDTH = 800;
  const GOOGLE_PHOTO_URL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${MAX_WIDTH}&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(GOOGLE_PHOTO_URL);

    if (!response.ok) {
      console.error(`Failed to fetch photo: ${response.statusText}`);
      return null;
    }

    // Return the image as binary data
    return await response.arrayBuffer();
  } 
  catch (error) {
    console.error('Error fetching photo from Google API:', error);
    return null;
  }
}