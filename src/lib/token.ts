import admin from 'firebase-admin';

export const authenticateToken = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error(`Token verification failed. ${error}`);
  }
};
