import { fetchGooglePhoto } from "@/lib/googlePhotos";
import { getCachedPhoto, cachePhoto } from "@/lib/photoCache";

export async function GET(req) {
  const photoReference = new URL(req.url).searchParams.get("photoReference");

  if (!photoReference) {
    return new Response(
      JSON.stringify({ status: 'error', message: 'Missing photo reference' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Check if the photo is already cached
    const cachedPhoto = await getCachedPhoto(photoReference);

    if (cachedPhoto) {
      return new Response(cachedPhoto, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'max-age=3600',
        },
      });
    }
    
    // If not cached, fetch the photo from Google API
    const photo = await fetchGooglePhoto(photoReference);
    if (!photo) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Photo not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Cache the photo for future requests
    await cachePhoto(photoReference, photo);

    return new Response(photo, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'max-age=3600',
      },
    });
  } 
  catch (error) {
    console.error('Error fetching photo:', error);
    return new Response(
      JSON.stringify({ status: 'error', message: 'Error fetching photo' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}