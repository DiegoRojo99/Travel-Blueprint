import { AuthUser, UserDB } from '@/types/users';
import { db } from '@/utils/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function addUserToDB(user: AuthUser) {
  if (!user?.uid) return;

  const userRef = doc(db, 'Users', user.uid);
  const userSnap = await getDoc(userRef);
  const existingUser = userSnap.exists() ? (userSnap.data() as UserDB) : null;

  const newProvider = user.providerData[0]?.providerId || 'unknown';
  const updatedProviders = existingUser?.providers
    ? Array.from(new Set([...existingUser.providers, newProvider]))
    : [newProvider];

  const userData: UserDB = {
    id: user.uid,
    name: user.displayName || existingUser?.name || 'Anonymous',
    email: user.email || existingUser?.email || '',
    profilePicture: user.photoURL || existingUser?.profilePicture || '',
    providers: updatedProviders,
    createdAt: existingUser?.createdAt || serverTimestamp(),
  };

  try {
    await setDoc(userRef, userData, { merge: true });
    console.log('User added/updated in Firestore');
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

export async function getUser(uid: string) {
  if (!uid) return;
  const userRef = doc(db, 'Users', uid);
  const userSnap = await getDoc(userRef);

  if(!userSnap.exists()) return;
  const userData = userSnap.data() as UserDB;
  return userData;
}