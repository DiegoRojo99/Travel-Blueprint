import { getUsersByEmailOrName } from '@/db/users';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: 'Email or name must be provided' }, { status: 400 });
  }

  try {
    const users = await getUsersByEmailOrName(query);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}