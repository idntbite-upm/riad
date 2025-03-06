import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Jost } from 'next/font/google';
// Import the custom CSS
import '@/components/home/Carousel.custom.css';

// Initialize the Jost font
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
});

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface RiadGalleryCarouselProps {
  images: GalleryImage[];
  mobileOptimized?: boolean; // Add prop for mobile optimization
}

const Carousel: React.FC<RiadGalleryCarouselProps> = ({ images, mobileOptimized = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation duration based on mobile optimization
  const animationDuration = mobileOptimized ? 300 : 500;

  // Check for mobile screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial state
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };
  
  const goToPrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };
  
  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50;
    
    if (isSwipe) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Determine if we should show thumbnails based on mobile optimization
  const showThumbnails = !mobileOptimized || !isMobile;

  return (
    <div className={`py-12 md:py-24 bg-[#161616] ${jost.className}`}>
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <span className="text-[#d1a163] text-base md:text-lg tracking-wider">
            DÉCOUVREZ
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-white mt-2 font-medium">
            Notre Galerie
          </h2>
        </div>
        
        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main carousel */}
          <div 
            className={`relative w-full ${mobileOptimized ? 'aspect-[4/3] md:aspect-[1117/726]' : 'aspect-[1117/726]'} overflow-hidden bg-[#0c0c0c]`}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity ease-in-out ${
                  index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{ transitionDuration: `${animationDuration}ms` }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1117px"
                  quality={mobileOptimized && isMobile ? 75 : 90}
                  priority={index === activeIndex}
                  loading={index === activeIndex ? "eager" : "lazy"}
                />
                
                {/* Caption overlay - simplified on mobile */}
                {(image.title || image.description) && (
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent ${
                    mobileOptimized && isMobile ? 'p-4' : 'p-6 md:p-8'
                  }`}>
                    {image.title && (
                      <h3 className={`${mobileOptimized && isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-medium text-white mb-2`}>
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className={`text-white/80 ${mobileOptimized && isMobile ? 'text-sm line-clamp-2' : 'md:text-lg'}`}>
                        {image.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Navigation arrows - smaller on mobile */}
          <button 
            className={`absolute top-1/2 left-4 -translate-y-1/2 ${
              mobileOptimized && isMobile ? 'w-8 h-8' : 'w-12 h-12'
            } rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center z-20 transition-all`}
            onClick={goToPrev}
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={mobileOptimized && isMobile ? "16" : "24"} height={mobileOptimized && isMobile ? "16" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            className={`absolute top-1/2 right-4 -translate-y-1/2 ${
              mobileOptimized && isMobile ? 'w-8 h-8' : 'w-12 h-12'
            } rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center z-20 transition-all`}
            onClick={goToNext}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={mobileOptimized && isMobile ? "16" : "24"} height={mobileOptimized && isMobile ? "16" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        {/* Dot indicators - larger on mobile for better tap targets */}
        <div className="mt-4 md:mt-6 flex justify-center">
          <div className="flex space-x-2 md:space-x-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`${mobileOptimized && isMobile ? 'w-4 h-4' : 'w-3 h-3'} rounded-full transition-all ${
                  idx === activeIndex ? 'bg-[#d1a163] w-6 md:w-6' : 'bg-white/40 hover:bg-white/60'
                }`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Thumbnail track - conditionally rendered */}
        {showThumbnails && (
          <div className="mt-6 md:mt-10 overflow-hidden">
            <div className="flex justify-center">
              <div className="flex space-x-2 md:space-x-4 px-4 max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gold scrollbar-track-dark">
                {images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`relative ${mobileOptimized ? 'min-w-[100px] md:min-w-[150px] h-16 md:h-24' : 'min-w-[150px] h-24'} transition-all duration-300 cursor-pointer carousel-thumbnail ${
                      idx === activeIndex ? 'active' : ''
                    }`}
                    onClick={() => goToSlide(idx)}
                  >
                    <Image
                      src={image.src}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes={mobileOptimized ? "(max-width: 768px) 100px, 150px" : "150px"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;