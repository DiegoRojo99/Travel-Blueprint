import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const NavBarLink: React.FC<NavLinkProps> = ({ href, onClick, children, className = '' }) => {
  return (
    <Link href={href} className={`block py-2 px-3 rounded ${className}`} onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavBarLink;