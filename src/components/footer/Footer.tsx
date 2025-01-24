'use client';
import dynamic from 'next/dynamic';
const Footer = dynamic(() => import('./FooterContent'), { ssr: false });
export default Footer;