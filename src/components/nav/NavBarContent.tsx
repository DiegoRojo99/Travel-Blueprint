import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import NavBarLink from './NavBarLink';

const NavBarContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-black text-white px-4 py-3 relative w-full">
      <div className="mx-0 w-full flex justify-between items-center">
        {/* Logo */}
        <NavBarLink href="/" onClick={closeMenu} className="text-xl font-bold">
          Travel Blueprint
        </NavBarLink>

        {/* Mobile Menu Button */}
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
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <NavBarLink href="/trips" onClick={closeMenu} className="hover:bg-gray-800">
            Trips
          </NavBarLink>
          {user ? (
            <button
              onClick={handleLogout}
              className="block py-2 px-3 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <NavBarLink href="/auth/login" onClick={closeMenu} className="hover:bg-gray-800">
              Login
            </NavBarLink>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-600 lg:hidden z-10">
          <div className="container mx-auto flex flex-col p-4 text-center">
            <NavBarLink href="/trips" onClick={closeMenu} className="hover:bg-gray-700">
              Trips
            </NavBarLink>
            {user ? (
              <button
                onClick={handleLogout}
                className="block py-2 px-3 rounded hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <NavBarLink href="/auth/login" onClick={closeMenu} className="hover:bg-gray-700">
                Login
              </NavBarLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBarContent;