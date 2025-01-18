'use client';
import dynamic from 'next/dynamic';
const NavBar = dynamic(() => import('@/components/NavBarContent'), { ssr: false });
export default NavBar;