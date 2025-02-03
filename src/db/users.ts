import { AuthUser, UserDB } from '@/types/users';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

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
  };

  try {
    await setDoc(userRef, userData, { merge: true });
  } 
  catch (error) {
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

export async function getUsersByEmailOrName(querySearch: string) {
  const usersRef = collection(db, 'Users');
  let users: UserDB[] = [];

  const emailQuery = query(usersRef, where('email', '==', querySearch));
  const emailSnapshot = await getDocs(emailQuery);
  users = users.concat(emailSnapshot.docs.map(doc => doc.data() as UserDB ));

  const nameQuery = query(usersRef, where('name', '==', querySearch));
  const nameSnapshot = await getDocs(nameQuery);
  users = users.concat(nameSnapshot.docs.map(doc => doc.data() as UserDB ));

  // Remove duplicates
  const uniqueUsers = Array.from(new Map(users.map(user => [user.id, user])).values());

  return uniqueUsers;
}