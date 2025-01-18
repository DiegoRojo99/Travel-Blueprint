'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Travel Blueprint
        </Link>
        <button
          className="block lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:space-x-6`}
        >
          {/* <Link href="/" className="block py-2 px-3 rounded hover:bg-gray-800">
            Home
          </Link> */}
          {/* <Link href="/about" className="block py-2 px-3 rounded hover:bg-gray-800">
            About
          </Link>
          <Link href="/services" className="block py-2 px-3 rounded hover:bg-gray-800">
            Services
          </Link>
          <Link href="/contact" className="block py-2 px-3 rounded hover:bg-gray-800">
            Contact
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;