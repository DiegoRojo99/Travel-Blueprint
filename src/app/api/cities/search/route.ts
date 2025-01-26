import { City, CityAPI } from '@/types/cities';
import { NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const url = `${GOOGLE_PLACES_API_URL}?query=${encodeURIComponent(query)}&type=locality&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: `Google API error: ${data.status}` }, { status: 500 });
    }

    const cities: City[] = data.results.map((place: CityAPI) => ({
      id: place.place_id,
      name: place.name,
      location: place.geometry.location,
      image: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        : null,
    }));

    return NextResponse.json(cities, { status: 200 });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json({ error: "Error fetching cities" }, { status: 500 });
  }
}