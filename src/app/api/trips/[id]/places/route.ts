import { getTripById } from "@/db/trips";
import crypto from 'crypto';
import { updateTripPlaces } from "../../../../../db/places";
import { Trip } from "@/types/trip";
import { context } from "@/types/routes";

export async function POST(req: Request, context: context): Promise<Response> {
  const { params } = context;
  const { id } = await params;

  let placeData;
  try {
    const body = await req.text();
    if (!body) {
      return new Response('Bad Request: Empty body', { status: 400 });
    }
    placeData = JSON.parse(body);
    if (!placeData) {
      throw new Error('Invalid JSON');
    }
  } 
  catch (error) {
    console.error('Error parsing JSON', error);
    return new Response('Bad Request: Invalid JSON', { status: 400 });
  }

  try {
    const trip: Trip | null = await getTripById(id);
    if (!trip) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }

    const newPlace = {
      id: crypto.randomUUID(),
      ...placeData,
    };

    const places = trip.places || [];
    places.push(newPlace);

    const updateResult = await updateTripPlaces(id, places);
    if (!updateResult) {
      return new Response('Error adding stop', { status: 500 });
    }

    return new Response(JSON.stringify(newPlace), { status: 201 });
  } catch (error) {
    console.error('Error adding stop', error);
    return new Response('Error adding stop', { status: 500 });
  }
}