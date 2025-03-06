import { useState, useRef, useEffect } from 'react';
import RoomCard from '../ui/RoomCard';
import { Jost } from 'next/font/google';

import '@/components/home/RoomCarousel.custom.css';

// Initialize the Jost font
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
});

// Room data interface
interface Room {
  id: string;
  image: string;
  name: string;
  pricePerNight: string;
  adults: number;
  size: string;
  equipment: {
    icon: string;
    name: string;
  }[];
}

interface RoomsCarouselProps {
  rooms: Room[];
}

const RoomsCarousel: React.FC<RoomsCarouselProps> = ({ rooms }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  
  const startDragging = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    
    if ('touches' in e) {
      // Touch event
      setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    } else {
      // Mouse event
      setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    }
    
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };
  
  const stopDragging = () => {
    setIsDragging(false);
  };
  
  const move = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    
    let x;
    if ('touches' in e) {
      // Touch event
      x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    } else {
      // Mouse event
      x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    }
    
    const walk = (x - startX) * 1.5; // Speed factor (reduced for more precise control)
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Track visible cards (especially for mobile)
  useEffect(() => {
    const updateVisibleIndex = () => {
      if (!carouselRef.current) return;
      
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      
      setVisibleIndex(Math.min(newIndex, rooms.length - 1));
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateVisibleIndex);
      return () => carousel.removeEventListener('scroll', updateVisibleIndex);
    }
  }, [rooms.length]);

  // Scroll to card functions for mobile pagination
  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    
    const cardWidth = carouselRef.current.offsetWidth;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`py-12 md:py-24 bg-[#161616] ${jost.className}`}>
      <div className="px-4 md:px-8 lg:px-12 max-w-[1300px] mx-auto">
        <div className="mb-8 md:mb-12">
          <span className="text-[#d1a163] text-base md:text-lg tracking-wider">
            SÉJOURNEZ
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-white mt-2 font-medium">
            Nos Chambres
          </h2>
        </div>
        
        {/* Carousel container with scroll snap for better mobile experience */}
        <div className="relative">
          {/* Left fade gradient - hidden on small mobile */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10"></div>
          
          {/* Draggable carousel with snap points */}
          <div
            ref={carouselRef}
            className={`flex overflow-x-auto snap-x snap-mandatory py-4 space-x-4 no-scrollbar cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={move}
            onTouchStart={startDragging}
            onTouchEnd={stopDragging}
            onTouchMove={move}
          >
            {/* Room cards with responsive sizing */}
            {rooms.map((room, index) => (
              <div 
                key={room.id}
                className="min-w-[calc(100%-2rem)] sm:min-w-[450px] md:min-w-[520px] flex-shrink-0 snap-center"
              >
                <RoomCard
                  image={room.image}
                  name={room.name}
                  pricePerNight={room.pricePerNight}
                  adults={room.adults}
                  size={room.size}
                  equipment={room.equipment}
                />
              </div>
            ))}
          </div>
          
          {/* Right fade gradient - hidden on small mobile */}
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10"></div>
          
          {/* Mobile pagination dots */}
          <div className="flex justify-center mt-4 sm:hidden">
            {rooms.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full transition-all ${
                  index === visibleIndex ? 'bg-[#d1a163] w-4' : 'bg-white/30'
                }`}
                onClick={() => scrollToCard(index)}
                aria-label={`View room ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Swipe indicator for mobile only */}
        <div className="text-center mt-3 text-white/50 text-xs sm:hidden">
          <span>← Glissez pour voir plus →</span>
        </div>
        
        {/* View all rooms button */}
        <div className="mt-8 md:mt-10 text-center">
          <a 
            href="/rooms" 
            className="inline-flex items-center justify-center h-[40px] md:h-[48px] px-6 md:px-8 border border-[#d1a163] text-[#d1a163] hover:bg-[#d1a163] hover:text-white transition-colors duration-300 text-sm md:text-base"
          >
            <span>Voir toutes nos chambres</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoomsCarousel;