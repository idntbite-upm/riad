import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { Jost } from 'next/font/google';
import BookingForm from './BookingForm';

// Import the custom datepicker styles
import "../styles/datepicker-custom.css";

// Initialize the Jost font with the weights you need
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
});

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  reducedMotion?: boolean; // Add prop for reduced motion on mobile
}

const ImageCarousel = ({ images, reducedMotion = false }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragPercent, setDragPercent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Animation duration based on reducedMotion prop
  const animationDuration = reducedMotion ? 400 : 700;
  const blurAmount = reducedMotion ? '0px' : '2px';

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isTransitioning) return;
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isTransitioning) return;

    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const difference = startX - currentX;
    setDragOffset(difference);

    // Calculate drag percentage (0 to 100)
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const percent = Math.min(100, Math.max(-100, (difference / containerWidth) * 100));
    setDragPercent(percent);

    // Prevent default to avoid text selection during drag
    e.preventDefault();
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged more than 40px or 15%, change slide
    if (Math.abs(dragOffset) > 40 || Math.abs(dragPercent) > 15) {
      setIsTransitioning(true);
      if (dragOffset > 0) {
        goToNext();
      } else {
        goToPrev();
      }

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        setDragPercent(0);
      }, animationDuration);
    } else {
      // Reset if not dragged enough
      setDragPercent(0);
      setDragOffset(0);
    }
  };

  const goToNext = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const goToPrev = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
      setIsTransitioning(false);
    }, animationDuration);
  };

  // Auto play (disabled on mobile/reduced motion for better performance)
  useEffect(() => {
    if (reducedMotion) return; // Skip auto-play for reduced motion
    
    const timer = setInterval(() => {
      if (!isDragging) {
        setIsTransitioning(true);
        goToNext();
        setTimeout(() => setIsTransitioning(false), animationDuration);
      }
    }, 20000);

    return () => clearInterval(timer);
  }, [isDragging, reducedMotion, animationDuration]);

  // Get the previous, current and next index
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  // Calculate individual slide styles based on drag percentage
  const getSlideStyle = (index: number): CSSProperties => {
    // Default styles for slides
    let transform = 'translateX(0)';
    let opacity = 0;
    let zIndex = 0;

    // Simpler transitions for reduced motion
    const transitionStyle = reducedMotion
      ? `transform ${animationDuration}ms ease, opacity ${animationDuration}ms ease`
      : `transform ${animationDuration}ms cubic-bezier(0.25, 1, 0.5, 1), opacity ${animationDuration}ms ease-out`;

    if (index === currentIndex) {
      // Current slide
      zIndex = 10;
      opacity = 1;

      if (isDragging || isTransitioning) {
        // Move current slide out based on drag direction
        const movePercent = dragPercent > 0 ? -dragPercent : -dragPercent;
        transform = `translateX(${movePercent}%)`;
      }
    }
    else if (index === nextIndex && (dragPercent > 0 || isTransitioning)) {
      // Next slide, revealed when dragging forward
      zIndex = 5;
      opacity = Math.min(1, dragPercent / 30); // Fade in as we drag

      if (reducedMotion) {
        // Simpler animation for mobile
        transform = 'translateX(100%)';
        opacity = isTransitioning ? 1 : opacity;
      } else {
        // Full animation for desktop
        const startOffset = 50;
        const moveDistance = startOffset * (1 - Math.min(1, dragPercent / 100));
        transform = `translateX(${100 - moveDistance}%)`;
      }
    }
    else if (index === prevIndex && (dragPercent < 0 || isTransitioning)) {
      // Previous slide, revealed when dragging backward
      zIndex = 5;
      opacity = Math.min(1, Math.abs(dragPercent) / 30);

      if (reducedMotion) {
        // Simpler animation for mobile
        transform = 'translateX(-100%)';
        opacity = isTransitioning ? 1 : opacity;
      } else {
        // Full animation for desktop
        const startOffset = 50;
        const moveDistance = startOffset * (1 - Math.min(1, Math.abs(dragPercent) / 100));
        transform = `translateX(${-100 + moveDistance}%)`;
      }
    }

    return {
      transform,
      opacity,
      zIndex,
      transition: isDragging ? 'none' : transitionStyle,
      position: 'absolute',
      inset: '0',
    };
  };

  // Handle booking form submission
  const handleBookingSubmit = (formData: any) => {
    console.log('Booking form submitted:', formData);
    // Add your booking submission logic here
  };

  // Star Rating Component
  const StarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div
      className="w-full h-screen relative overflow-hidden bg-black"
      ref={carouselRef}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseMove={handleDragMove}
      onTouchMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchEnd={handleDragEnd}
      onTouchCancel={handleDragEnd}
    >
      {/* Container for all slides */}
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        {/* Individual slides with custom transform */}
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full absolute"
            style={getSlideStyle(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === currentIndex}
              loading={index === currentIndex ? "eager" : "lazy"}
              quality={reducedMotion ? 75 : 90}
            />
          </div>
        ))}
      </div>

      {/* Subtle full-screen blur overlay - disabled for reduced motion */}
      <div className={`absolute inset-0 bg-black/15 backdrop-blur-[${blurAmount}] z-20`}></div>

      {/* Text overlay positioned in the middle left */}
      <div
        className="absolute inset-0 z-40 flex items-center transform transition-opacity"
        style={{ 
          opacity: isTransitioning ? 0 : 1,
          transitionDuration: `${animationDuration}ms`
        }}
      >
        <div className="pl-6 md:pl-16 lg:pl-24 w-full md:w-2/3 lg:w-1/2 pr-4">
          <div className="p-4 md:p-8">
            <div className="mb-2 md:mb-4">
              <StarRating />
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white drop-shadow-lg ${jost.className}`}>
              {images[currentIndex]?.title || 'Riad Emberiza Sahari'}
            </h2>
            <p className={`text-base sm:text-lg text-white/90 mb-4 md:mb-6 drop-shadow-md ${jost.className}`}>
              {images[currentIndex]?.description || 'Experience authentic Moroccan hospitality in our beautiful riad in the heart of the medina.'}
            </p>
            <button className={`bg-[#d1a163] hover:bg-amber-700 text-white px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-medium transition-colors ${jost.className}`}>
              Découvrir
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form at the bottom */}
      <BookingForm onSubmit={handleBookingSubmit} className={reducedMotion ? "sm:max-w-full md:max-w-[90%]" : ""} />
    </div>
  );
};

export default ImageCarousel;