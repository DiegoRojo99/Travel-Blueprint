'use client';
import dynamic from 'next/dynamic';
const SignUpPage = dynamic(() => import('./signUpPage'), { ssr: false });
export default SignUpPage;