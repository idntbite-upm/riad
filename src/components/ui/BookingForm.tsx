import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Jost } from 'next/font/google';

// Import the react-datepicker styles
import "react-datepicker/dist/react-datepicker.css";

// Initialize the Jost font with the weights you need
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
});

interface BookingFormProps {
  className?: string;
  onSubmit?: (formData: {
    checkInDate: string;
    checkOutDate: string;
    adults: string;
    children: string;
  }) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ className = '', onSubmit }) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState<string>("1");
  const [children, setChildren] = useState<string>("0");
  const [isExpanded, setIsExpanded] = useState(false); // For mobile toggle
  
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate min checkout date (1 day after checkin)
  const minCheckoutDate = checkInDate ? new Date(checkInDate) : null;
  if (minCheckoutDate) {
    minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
  }

  // Handle click outside to close form
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && 
          formRef.current && 
          !formRef.current.contains(event.target as Node) &&
          buttonRef.current && 
          !buttonRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Toggle form visibility
  const toggleForm = () => {
    setIsExpanded(prevState => !prevState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({
        checkInDate: checkInDate ? format(checkInDate, 'yyyy-MM-dd') : '',
        checkOutDate: checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : '',
        adults,
        children
      });
    }

    // On mobile, collapse the form after submission
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        ref={buttonRef}
        className="md:hidden fixed bottom-4 left-4 z-40 bg-[#d1a163] text-white p-3 rounded-full shadow-lg"
        onClick={toggleForm}
        aria-label={isExpanded ? "Masquer le formulaire" : "Afficher le formulaire de réservation"}
      >
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </button>

      {/* Overlay to close form when clicked */}
      {isExpanded && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Form container - hidden by default on mobile, shown when expanded */}
      <div
        ref={formRef}
        className={`
          ${isExpanded ? 'bottom-0' : '-bottom-full'} md:bottom-0 
          transition-all duration-300
          bg-[#161616] md:bg-[#161616]/95 
          fixed md:absolute left-0 md:left-[5%] 
          w-full md:w-[90%] lg:w-4/5 
          max-w-[1240px] z-40
          ${jost.className} ${className}
        `}
      >
        <div className="w-full">
          {/* Close button inside form (mobile only) */}
          <button 
            className="md:hidden absolute right-4 top-4 text-white/60 hover:text-white z-50" // Added z-50 for higher priority
            onClick={(e) => {
              e.stopPropagation(); // Stop event from bubbling up
              setIsExpanded(false);
            }}
            aria-label="Fermer le formulaire"
            type="button" // Explicitly set as button type to ensure it doesn't submit the form
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap md:flex-nowrap items-center p-4 md:p-6 lg:p-8 pr-4 md:pr-16 lg:pr-36"
          >
            {/* Hidden for accessibility but not needed in the UI */}
            <p className="sr-only">
              <small>Les champs obligatoires sont suivis de *</small>
            </p>

            {/* Form fields remain unchanged */}
            {/* Check-in Date */}
            <div className="w-1/2 md:w-1/4 px-2 mb-3 md:mb-0 relative">
              <label htmlFor="check-in-date" className="block text-[#adaaa4] mb-1 text-sm md:text-base">
                Arrivée <span className="sr-only">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  id="check-in-date"
                  selected={checkInDate}
                  onChange={(date: React.SetStateAction<Date | null>) => setCheckInDate(date)}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date d'arrivée"
                  required
                  locale={fr}
                  className="w-full h-[40px] md:h-[50px] px-3 md:px-5 py-1 md:py-2 bg-[#161616] border border-[#2e2e2e] text-white cursor-pointer text-sm md:text-base"
                />
                <div className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-[#adaaa4] pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Check-out Date */}
            <div className="w-1/2 md:w-1/4 px-2 mb-3 md:mb-0 relative">
              <label htmlFor="check-out-date" className="block text-[#adaaa4] mb-1 text-sm md:text-base">
                Départ <span className="sr-only">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  id="check-out-date"
                  selected={checkOutDate}
                  onChange={(date: React.SetStateAction<Date | null>) => setCheckOutDate(date)}
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={minCheckoutDate || new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date de départ"
                  required
                  locale={fr}
                  className="w-full h-[40px] md:h-[50px] px-3 md:px-5 py-1 md:py-2 bg-[#161616] border border-[#2e2e2e] text-white cursor-pointer text-sm md:text-base"
                  disabled={!checkInDate}
                />
                <div className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-[#adaaa4] pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Adults */}
            <div className="w-1/2 md:w-1/6 px-2 mb-4 md:mb-0">
              <label htmlFor="adults" className="block text-[#adaaa4] mb-1 text-sm md:text-base">
                Adultes
              </label>
              <div className="relative">
                <input
                  id="adults"
                  type="number"
                  min="1"
                  max="30"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full h-[40px] md:h-[50px] px-3 md:px-5 py-1 md:py-2 bg-[#161616] border border-[#2e2e2e] text-white text-sm md:text-base"
                />
                <div className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-[#adaaa4] pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Children */}
            <div className="w-1/2 md:w-1/6 px-2 mb-4 md:mb-0">
              <label htmlFor="children" className="block text-[#adaaa4] mb-1 text-sm md:text-base">
                Enfants
              </label>
              <div className="relative">
                <input
                  id="children"
                  type="number"
                  min="0"
                  max="10"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  className="w-full h-[40px] md:h-[50px] px-3 md:px-5 py-1 md:py-2 bg-[#161616] border border-[#2e2e2e] text-white text-sm md:text-base"
                />
                <div className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-[#adaaa4] pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full md:w-auto px-2 ml-auto md:absolute md:right-0 md:top-0 md:h-full">
              <button
                type="submit"
                className="w-full md:w-[100px] lg:w-[120px] h-[40px] md:h-full bg-[#d1a163] text-white hover:brightness-110 transition-all text-sm md:text-base"
              >
                Chercher
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;