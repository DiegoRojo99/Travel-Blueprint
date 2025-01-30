import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/utils/firebase';
import { FirebaseError } from 'firebase/app';

interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // Current User
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } 
    catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error during login:", error);
        if (error.code === 'auth/user-not-found') {
          setError('User not found');
        }
        else if (error.code === 'auth/invalid-credential') {
          setError('Invalid credentials');
        }
        else {
          setError('An unknown error occurred');
        }
      }
      else if (error instanceof Error) {
        console.error("Error during login:", error);
        setError(error.message);
      }
      else {
        setError('An unknown error occurred');
      }
      return false;
    } 
    finally {
      setLoading(false);
    }
  };

  // Sign Up function
  const signUp = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } 
    catch (error: unknown) {
      
      if (error instanceof FirebaseError) {
        console.error("Firebase Error during set up:", error.code);
        if (error.code === 'auth/email-already-in-use') {
          setError('Email already in use');
        }
        else if (error.code === 'auth/invalid-email') {
          setError('Invalid email');
        }
        else if (error.code === 'auth/weak-password') {
          setError('Weak password');
        }
        else {
          setError('An unknown error occurred');
        }
      }
      else if (error instanceof Error) {
        console.error("Error during login:", error);
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      return false;
    } 
    finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: unknown) {
      console.error("Error during logout:", error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (err) {
      setError('Google sign-in failed');
      console.error(err)
      return false;
    }
  };

  return { user, login, signUp, logout, error, loading, loginWithGoogle };
};