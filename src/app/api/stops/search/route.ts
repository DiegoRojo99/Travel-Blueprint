import { searchGooglePlaces } from "@/db/places";

export async function GET(req: Request): Promise<Response> {
  const userId = req.headers.get("x-user-id");
  const query = new URL(req.url).searchParams.get("query");

  if (!userId) {
    return new Response("Unauthorized: Missing user ID", { status: 401 });
  }

  if (!query) {
    return new Response("Bad Request: Missing search query", { status: 400 });
  }

  try {
    const stops = await searchGooglePlaces(query);
    return new Response(JSON.stringify(stops), { status: 200 });
  } 
  catch (error) {
    console.error("Error fetching stops", error);
    return new Response("Error fetching stops", { status: 500 });
  }
}
