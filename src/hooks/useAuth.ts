
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } 
    catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } 
      else {
        console.error("An unknown error occurred");
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
      if (error instanceof Error) {
        console.error(error.message);
      } 
      else {
        console.error("An unknown error occurred");
      }
      return false;
    }finally {
      setLoading(false);
    }
  };

  return { login, signUp, error, loading };
};
