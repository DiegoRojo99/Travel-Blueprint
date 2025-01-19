'use client';
import dynamic from 'next/dynamic';
const TripDetails = dynamic(() => import('./TripDetailsContent'), { ssr: false });
export default TripDetails;