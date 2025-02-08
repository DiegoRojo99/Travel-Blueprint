import { updateTripStops } from "@/db/stops";
import { getTripById } from "@/db/trips";
import { context } from "@/types/routes";
import crypto from 'crypto';

export async function GET(req: Request, context: context) {
  const { id } = await context.params;

  if (!id) {
    return new Response('Bad Request: Missing trip ID', { status: 400 });
  }

  try {
    const trip = await getTripById(id);
    if (!trip) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }

    return new Response(JSON.stringify(trip.stops || []), { status: 200 });
  } catch (error) {
    console.error('Error fetching stops', error);
    return new Response('Error fetching stops', { status: 500 });
  }
}

export async function POST(req: Request, context: context) {
  const { id } = await context.params;

  let stopData;
  try {
    const body = await req.text();
    if (!body) {
      return new Response('Bad Request: Empty body', { status: 400 });
    }
    stopData = JSON.parse(body);
    if (!stopData) {
      throw new Error('Invalid JSON');
    }
  } catch (error) {
    // Handle JSON parsing errors
    console.error('Error parsing JSON', error);
    return new Response('Bad Request: Invalid JSON', { status: 400 });
  }

  if (!id || !stopData.date) {
    return new Response('Bad Request: Missing required fields', { status: 400 });
  }

  try {
    const trip = await getTripById(id);
    if (!trip) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }

    const newStop = {
      id: crypto.randomUUID(),
      ...stopData,
    };

    trip.stops = trip.stops || [];
    trip.stops.push(newStop);

    const updateResult = await updateTripStops(id, trip.stops);
    if (!updateResult) {
      return new Response('Error adding stop', { status: 500 });
    }

    return new Response(JSON.stringify(newStop), { status: 201 });
  } catch (error) {
    console.error('Error adding stop', error);
    return new Response('Error adding stop', { status: 500 });
  }
}

export async function PUT(req: Request, context: context) {
  const { id } = await context.params;
  const stopData = await req.json();

  if (!id) {
    return new Response('Bad Request: Missing required IDs', { status: 400 });
  }

  try {
    const trip = await getTripById(id);
    if (!trip) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }

    const stopIndex = trip.stops?.findIndex((stop) => stop.id === stopData.id);
    if (stopIndex === -1 || stopIndex === undefined) {
      return new Response('Not Found: Stop not found', { status: 404 });
    }

    if (trip.stops) {
      trip.stops[stopIndex] = { ...trip.stops[stopIndex], ...stopData };
      await updateTripStops(id, trip.stops);
      return new Response(JSON.stringify(trip.stops?.[stopIndex]), { status: 200 });
    }
    
    return new Response('Trip has no stops', { status: 500 });
  } catch (error) {
    console.error('Error updating stop', error);
    return new Response('Error updating stop', { status: 500 });
  }
}

export async function DELETE(req: Request, context: context) {
  const { id, stopId } = await context.params;

  if (!id || !stopId) {
    return new Response('Bad Request: Missing required IDs', { status: 400 });
  }

  try {
    const trip = await getTripById(id);
    if (!trip) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }

    trip.stops = trip.stops?.filter((stop) => stop.id !== stopId) || [];
    await updateTripStops(id, trip.stops);

    return new Response('Stop deleted successfully', { status: 204 });
  } catch (error) {
    console.error('Error deleting stop', error);
    return new Response('Error deleting stop', { status: 500 });
  }
}