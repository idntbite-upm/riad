import React, { useState } from 'react';
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

  // Calculate min checkout date (1 day after checkin)
  const minCheckoutDate = checkInDate ? new Date(checkInDate) : null;
  if (minCheckoutDate) {
    minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
  }

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
  };

  return (
    <div className={`bg-[#161616] absolute left-0 bottom-0 w-4/5 max-w-[1240px] z-40 ${jost.className} ${className}`}>
      <div className="w-full">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-wrap md:flex-nowrap items-center p-4 md:p-6 lg:p-8 pr-16 lg:pr-36"
        >
          {/* Hidden for accessibility but not needed in the UI */}
          <p className="sr-only">
            <small>Les champs obligatoires sont suivis de *</small>
          </p>

          {/* Check-in Date */}
          <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0 relative">
            <label htmlFor="check-in-date" className="block text-[#adaaa4] mb-1">
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
                className="w-full h-[50px] px-5 py-2 bg-[#161616] border border-[#2e2e2e] text-white cursor-pointer"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#adaaa4] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Check-out Date */}
          <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0 relative">
            <label htmlFor="check-out-date" className="block text-[#adaaa4] mb-1">
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
                className="w-full h-[50px] px-5 py-2 bg-[#161616] border border-[#2e2e2e] text-white cursor-pointer"
                disabled={!checkInDate}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#adaaa4] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Adults - Changed to number input */}
          <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
            <label htmlFor="adults" className="block text-[#adaaa4] mb-1">
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
                className="w-full h-[50px] px-5 py-2 bg-[#161616] border border-[#2e2e2e] text-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#adaaa4] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Children - Changed to number input */}
          <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
            <label htmlFor="children" className="block text-[#adaaa4] mb-1">
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
                className="w-full h-[50px] px-5 py-2 bg-[#161616] border border-[#2e2e2e] text-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#adaaa4] pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full md:w-auto px-2 ml-auto md:absolute md:right-0 md:top-0 md:h-full">
            <button 
              type="submit" 
              className="w-full md:w-[120px] h-[48px] md:h-full bg-[#b68c56] text-white hover:brightness-110 transition-all"
            >
              Chercher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;