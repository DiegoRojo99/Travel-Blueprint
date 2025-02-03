export async function sendRequestWithToken(url: string, getToken: () => Promise<string | null>, options: RequestInit = {}) {
  const token = await getToken();
  
  if (!token) {
    throw new Error('No token available!');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}