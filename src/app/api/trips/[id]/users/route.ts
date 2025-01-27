import { addUserToTrip } from "@/db/trips";

export async function POST(req: Request, context: { params: { tripId: string } }): Promise<Response> {
  const { tripId } = context.params;

  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    await addUserToTrip(tripId, userId);

    return new Response(JSON.stringify({ message: `User ${userId} added to trip ${tripId}` }), { status: 200 });
  } catch (error) {
    console.error("Error adding user to trip:", error);
    return new Response(JSON.stringify({ error: "Failed to add user to trip" }), { status: 500 });
  }
}