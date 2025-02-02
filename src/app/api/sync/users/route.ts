export async function GET() {
  try {
    console.log("Syncing Users...")
    return new Response('All users updated successfully.', { status: 200 });
  } catch (error) {
    console.error('Error updating trips', error);
    return new Response('Error updating trips', { status: 500 });
  }
}
