'use client'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      {/* Add navigation links here if needed */}
    </nav>
  );
}