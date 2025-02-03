import admin, { auth } from 'firebase-admin';

export const authenticateToken = async (token: string): Promise<auth.DecodedIdToken | Error> => {
  try {
    const decodedToken: auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error(`Token verification failed. ${error}`);
  }
};
