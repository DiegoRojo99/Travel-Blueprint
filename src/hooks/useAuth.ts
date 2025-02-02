import { useState, useEffect } from 'react';
import { auth, googleProvider } from '@/utils/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { addUserToDB } from '@/db/users';
import { AuthUser } from '@/types/users';
import { FirebaseError } from 'firebase/app';

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          providerData: firebaseUser.providerData.map((provider) => ({
            providerId: provider.providerId,
          })),
        };
        await addUserToDB(authUser);
      }
    });

    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      return userCredential.user;
    } 
    catch (err) {
      setError((err as FirebaseError).message);
      return null;
    }
  }

  async function signup(email: string, password: string, displayName?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const authUser: AuthUser = {
        uid: firebaseUser.uid,
        displayName: displayName || firebaseUser.displayName || null,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        providerData: firebaseUser.providerData.map((provider) => ({
          providerId: provider.providerId,
        })),
      };

      await addUserToDB(authUser);
      setError(null);
      return firebaseUser;
    } 
    catch (err) {
      setError((err as FirebaseError).message);
      return null;
    }
  }

  async function loginWithGoogle() {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = userCredential.user;

      const authUser: AuthUser = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        providerData: firebaseUser.providerData.map((provider) => ({
          providerId: provider.providerId,
        })),
      };

      await addUserToDB(authUser);
      setError(null);
      return firebaseUser;
    }
    catch (err) {
      setError((err as FirebaseError).message);
      return null;
    }
  }

  async function logout() {
    await auth.signOut();
    setUser(null);
  }

  return { user, loading, error, login, signup, loginWithGoogle, logout };
}