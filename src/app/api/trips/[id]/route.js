import { getTripById, updateTrip, deleteTrip } from "@/db/trips";

export async function GET(req, context) {
  const { params } = context;
  const { id } = await params;

  if (!id) {
    return new Response('Bad Request: Missing trip ID', { status: 400 });
  }

  try {
    const trip = await getTripById(id);

    if (!trip) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }

    return new Response(JSON.stringify(trip), { status: 200 });
  } catch (error) {
    console.error('Error fetching trip details', error);
    return new Response('Error fetching trip details', { status: 500 });
  }
}

export async function PUT(req, context) {
  const { params } = context;
  const { id } = await params;
  const tripData = await req.json();

  if (!id) {
    return new Response('Bad Request: Missing trip ID', { status: 400 });
  }

  try {
    const updatedTrip = await updateTrip(id, tripData);

    if (!updatedTrip) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }
    return new Response(JSON.stringify(updatedTrip), { status: 200 });
  } catch (error) {
    console.error('Error updating trip', error);
    return new Response('Error updating trip', { status: 500 });
  }
}

export async function DELETE(req, context) { 
  const { params } = context;
  const { id } = await params;

  if (!id) {
    return new Response('Bad Request: Missing trip ID', { status: 400 });
  }

  try {
    const deletedTrip = await deleteTrip(id);

    if (!deletedTrip) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }

    return new Response('Trip deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting trip', error);
    return new Response('Error deleting trip', { status: 500 });
  }
}