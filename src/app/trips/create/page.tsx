'use client';
import dynamic from 'next/dynamic';
const TripDetails = dynamic(() => import('./TripCreationPage'), { ssr: false });
export default TripDetails;