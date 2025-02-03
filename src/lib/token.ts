import { admin } from "./firebaseAdmin";
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    res.status(401).send('Unauthorized: No token provided');
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).send('Unauthorized: Invalid token');
  }
}

module.exports = authenticateToken;