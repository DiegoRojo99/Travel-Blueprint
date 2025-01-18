'use client';
import dynamic from 'next/dynamic';
const LoginPage = dynamic(() => import('./loginPage'), { ssr: false });
export default LoginPage;