import { addTrip, getUserTrips } from "../../../db/trips";

export async function GET(req) {
  const userId = req.headers.get('x-user-id');

  if (!userId) {
    return new Response('Unauthorized: Missing user ID', { status: 401 });
  }

  try {
    const trips = await getUserTrips(userId);
    return new Response(JSON.stringify(trips), { status: 200 });
  } catch (error) {
    console.error('Error fetching trips', error);
    return new Response('Error fetching trips', { status: 500 });
  }
}

export async function POST(req) {
  const userId = req.headers.get('x-user-id');
  const tripData = await req.json();

  if (!userId) {
    return new Response('Unauthorized: Missing user ID', { status: 401 });
  }

  try {
    const tripId = await addTrip(tripData, userId);
    return new Response(JSON.stringify({ message: 'Trip added successfully', tripId }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding trip', error);
    return new Response('Error adding trip', { status: 500 });
  }
}
