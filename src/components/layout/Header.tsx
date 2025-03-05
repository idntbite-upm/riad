import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Jost } from 'next/font/google';

// Initialize the Jost font with the weights you need
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
});

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Le Riad', href: '/the-riad' },
    { name: 'Chambres', href: '/rooms' },
    { name: 'Galerie', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}>
      <div className="max-w-[1300px] mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <div className="w-8 h-6 relative">
              <span className={`absolute left-0 w-full h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 top-3' : 'top-0'
                }`}></span>
              <span className={`absolute left-0 w-full h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : 'top-3'
                }`}></span>
              <span className={`absolute left-0 w-full h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 top-3' : 'top-6'
                }`}></span>
            </div>
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none md:w-1/4 flex justify-center md:justify-start">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Riad Emberiza Sahari"
                width={264}
                height={37}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-white hover:text-[#d1a163] transition-colors ${jost.className} font-medium text-lg relative group`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d1a163] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-6 md:w-1/4 justify-end">
            {/* Cart */}
            <div className="relative">
              <svg
                className="w-6 h-6 text-white hover:text-[#d1a163] transition-colors"
                viewBox="0 0 24 26"
              >
                <path
                  fill="currentColor"
                  d="M12,0 C9.253906,0 7,2.253906 7,5 L7,6 L2.0625,6 L2,6.9375 L1,24.9375 L0.9375,26 H23.0625 L23,24.9375 L22,6.9375 L21.9375,6 L17,6 L17,5 C17,2.253906 14.746094,0 12,0 Z M12,2 C13.65625,2 15,3.34375 15,5 L15,6 L9,6 L9,5 C9,3.34375 10.34375,2 12,2 Z M3.9375,8 L7,8 L7,11 L9,11 L9,8 L15,8 L15,11 L17,11 L17,8 L20.0625,8 L20.9375,24 L3.0625,24 L3.9375,8 Z"
                />
              </svg>
              <div className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </div>
            </div>

            {/* Reservation Button */}
            <Link
              href="/reservation"
              className="hidden md:flex items-center bg-[#d1a163] text-white px-6 py-3 hover:bg-amber-700 transition-colors font-jost"
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z"
                />
              </svg>
              Réservation
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <nav className="text-center">
              <ul className="space-y-8">
                {menuItems.map((item) => (
                  <li key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className="text-4xl text-white hover:text-[#d1a163] font-jost transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#d1a163] transition-all duration-300 group-hover:w-1/2"></span>
                  </li>
                ))}
                <li className="relative group">
                  <Link
                    href="/reservation"
                    className="inline-block mt-8 text-lg text-[#d1a163] transition-colors hover:text-amber-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Réservation
                  </Link>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#d1a163] transition-all duration-300 group-hover:w-3/4"></span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;