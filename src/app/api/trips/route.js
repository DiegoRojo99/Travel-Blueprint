import { getTrips, addTrip } from '../../../utils/firestore';

// Fetch trips from Firestore
export async function GET() {
  try {
    const trips = await getTrips();
    return new Response(JSON.stringify(trips), { status: 200 });
  } catch (error) {
    return new Response('Error fetching trips', { status: 500, error });
  }
}

// Add a new trip to Firestore
export async function POST(req) {
  const tripData = await req.json();
  
  try {
    await addTrip(tripData);
    return new Response('Trip added successfully', { status: 201 });
  } catch (error) {
    return new Response('Error adding trip', { status: 500, error });
  }
}