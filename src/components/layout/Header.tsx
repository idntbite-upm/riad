import { useState, useEffect, useRef } from 'react';
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if header should be visible based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        // Scrolling down & past threshold - hide header
        setIsHeaderVisible(false);
      } else {
        // Scrolling up or near top - show header
        setIsHeaderVisible(true);
      }
      
      setIsScrolled(currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Le Riad', href: '/the-riad' },
    { name: 'Chambres', href: '/rooms' },
    { name: 'Galerie', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => {
    // When opening menu, always scroll to top for better UX
    if (!isMenuOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-sm border-b border-white/10 shadow-lg' : 'bg-transparent'
        } ${isHeaderVisible ? 'transform-none' : 'transform -translate-y-full'}`}
      >
        <div className="max-w-[1300px] mx-auto px-4 py-3 md:py-5">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button - larger touch target */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 -ml-2 focus:outline-none focus:ring-1 focus:ring-[#d1a163] rounded"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-8 h-6 relative">
                <span className={`absolute left-0 w-full h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 top-3' : 'top-0'}`}></span>
                <span className={`absolute left-0 w-full h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : 'top-3'}`}></span>
                <span className={`absolute left-0 w-full h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 top-3' : 'top-6'}`}></span>
              </div>
            </button>

            {/* Logo - optimized size for mobile */}
            <div className="flex-1 md:flex-none md:w-1/4 flex justify-center md:justify-start">
              <Link href="/" onClick={() => isMenuOpen && setIsMenuOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="Riad Emberiza Sahari"
                  width={264}
                  height={37}
                  className="h-7 md:h-8 w-auto"
                  priority
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
            <div className="flex items-center space-x-4 md:space-x-6 md:w-1/4 justify-end">
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

              {/* Reservation Button - Desktop Only */}
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
        </div>

        {/* Mobile Menu - Full Screen */}
        <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-50 transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}>
          {/* Close button - top right for easier access */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            aria-label="Fermer le menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <nav className="text-center w-full">
              <ul className="space-y-8">
                {menuItems.map((item) => (
                  <li key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className="text-3xl md:text-4xl text-white hover:text-[#d1a163] font-jost transition-colors block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#d1a163] transition-all duration-300 group-hover:w-1/2"></span>
                  </li>
                ))}
                <li className="relative group pt-8">
                  <Link
                    href="/reservation"
                    className="inline-flex items-center justify-center px-8 py-3 text-xl bg-[#d1a163] text-white transition-colors hover:bg-amber-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 384 512">
                      <path fill="currentColor" d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z" />
                    </svg>
                    Réservation
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Floating mobile menu button - appears when header is hidden */}
      <button
        onClick={toggleMenu}
        className={`md:hidden fixed right-4 bottom-20 z-40 bg-[#d1a163] text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${
          !isHeaderVisible && !isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Floating reservation button for mobile */}
      <Link
        href="/reservation"
        className={`md:hidden fixed left-4 bottom-20 z-40 bg-[#d1a163] text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${
          !isHeaderVisible && !isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Réservation"
      >
        <svg className="w-6 h-6" viewBox="0 0 384 512">
          <path fill="currentColor" d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z" />
        </svg>
      </Link>
    </>
  );
};

export default Header;