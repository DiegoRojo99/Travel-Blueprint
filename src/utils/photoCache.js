const photoCache = new Map();
const CACHE_TTL = 3600 * 1000 * 24; 

export async function getCachedPhoto(photoReference) {
  const cacheEntry = photoCache.get(photoReference);
  if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TTL) {
    return cacheEntry.photo;
  }
  return null;
}

export async function cachePhoto(photoReference, photo) {
  photoCache.set(photoReference, {
    photo,
    timestamp: Date.now(),
  });
}