'use client';
import dynamic from 'next/dynamic';
const TripsPage = dynamic(() => import('./TripsPageContent'), { ssr: false });
export default TripsPage;