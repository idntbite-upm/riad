import React from 'react';
import Image from 'next/image';
import { Jost, Fraunces } from 'next/font/google';

// Initialize fonts
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  variable: '--font-fraunces',
});

const HeroSection: React.FC = () => {
  return (
    <div className={`flex flex-wrap bg-[#161616] px-4 md:px-8 lg:px-12 pt-20 md:pt-48 pb-16 md:pb-24 ${jost.variable} ${fraunces.variable}`}>
      {/* First column - Text content - Full width on mobile */}
      <div className="w-full md:w-[44%] flex flex-col gap-0 mb-10 md:mb-0">
        <div>
          {/* Subtitle */}
          <div className="mb-3 md:mb-5">
            <span className="text-[#b68c56] font-light text-sm md:text-lg tracking-wider font-fraunces">
              À propos de nous
            </span>
          </div>
          
          {/* Title - Smaller on mobile */}
          <h3 className="text-white text-xl md:text-3xl lg:text-[38px] mb-4 md:mb-8 font-fraunces uppercase leading-tight">
            <span>Un RIAD DANS LA VILLE DES RÊVES DU DÉSERT</span>
          </h3>
        </div>
        
        {/* Description - Adjusted line height for mobile */}
        <div className="mb-5 md:mb-8">
          <p className="text-[#d3d0cb] font-fraunces text-sm md:text-base leading-relaxed">
            Le Riad EMBERIZA SAHARI, situé au cœur de la Médina de Marrakech est un havre de tranquillité. Les origines du riad remontent au XIV° siècle. Niché parmi les monuments historiques qui définissent le paysage culturel de la ville
          </p>
        </div>
        
        {/* Button - Smaller on mobile */}
        <div className="mt-3 md:mt-7">
          <a 
            href="/riad" 
            className="inline-flex items-center justify-center h-[40px] md:h-[48px] px-6 md:px-8 bg-[#b68c56] text-white border border-[#b68c56] hover:brightness-110 transition-all duration-300 font-jost tracking-wide text-sm md:text-base"
          >
            <span>Le Riad</span>
          </a>
        </div>
      </div>
      
      {/* Spacer column - Hidden on mobile */}
      <div className="hidden md:block md:w-[4%]"></div>
      
      {/* Images container for mobile - Side by side, smaller images */}
      <div className="w-full md:hidden flex space-x-2">
        <div className="w-1/2 relative aspect-square overflow-hidden">
          <Image 
            src="/images/riad/riad-01.jpg"
            alt="IMG-20241115-WA0029"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
        </div>
        <div className="w-1/2 relative aspect-square overflow-hidden">
          <Image 
            src="/images/riad/riad-02.jpg"
            alt="IMG-20241115-WA0038"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
        </div>
      </div>
      
      {/* First image column - Desktop only */}
      <div className="hidden md:flex w-[19%] z-10">
        <div className="relative w-full">
          <div className="mt-[100px] -mr-[100px] md:-mr-[150px] lg:-mr-[200px]">
            <div className="aspect-square relative overflow-hidden">
              <Image 
                src="/images/riad/riad-01.jpg"
                alt="IMG-20241115-WA0029"
                fill
                className="object-cover"
                sizes="25vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Second image column - Desktop only */}
      <div className="hidden md:flex w-[33%]">
        <div className="relative w-full">
          <div className="-mt-[100px]">
            <div className="aspect-square relative overflow-hidden">
              <Image 
                src="/images/riad/riad-02.jpg"
                alt="IMG-20241115-WA0038"
                fill
                className="object-cover"
                sizes="33vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;