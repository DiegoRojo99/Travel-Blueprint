import { saveCitiesToFirestore } from "@/db/cities";
import { addTrip, addUserToTrip, deleteTrip, getUserTrips } from "../../../db/trips";
import { context } from "@/types/routes";
import { authenticateToken } from "@/lib/token";

export async function GET(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split('Bearer ')[1];
    if (!token) {      
      return new Response(JSON.stringify({message: 'No token provided'}), { status: 401 });
    }

    const decodedToken = await authenticateToken(token);
    if (decodedToken instanceof Error) {
      return new Response(JSON.stringify({message: 'Invalid token'}), { status: 401 });
    }
    
    const trips = await getUserTrips(decodedToken.uid);
    return new Response(JSON.stringify(trips), { status: 200 });
  } 
  catch (error) {
    console.error('Error fetching trips', error);
    return new Response('Error fetching trips', { status: 500 });
  }
}

export async function POST(req: Request) {
  const userId = req.headers.get('x-user-id');
  const tripData = await req.json();

  if (!userId) {
    return new Response('Unauthorized: Missing user ID', { status: 401 });
  }

  try {
    const tripId = await addTrip(tripData);
    await saveCitiesToFirestore(tripData.destinations);
    await addUserToTrip(tripId, userId, "Owner");
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

export async function DELETE(req: Request, context: context): Promise<Response> {
  const { params } = context;
  const { id } = await params;

  if (!id) {
    return new Response('Bad Request: Missing required ID', { status: 400 });
  }

  try {
    const tripDeleted = await deleteTrip(id);
    if (!tripDeleted) {
      return new Response('Not Found: Trip not found', { status: 404 });
    }
    return new Response('Trip deleted successfully', { status: 204 });
  } 
  catch (error) {
    console.error('Error deleting trip', error);
    return new Response('Error deleting trip', { status: 500 });
  }
}
