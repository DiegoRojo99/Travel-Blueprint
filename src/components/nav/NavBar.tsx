'use client';
import dynamic from 'next/dynamic';
const NavBar = dynamic(() => import('@/components/nav/NavBarContent'), { ssr: false });
export default NavBar;