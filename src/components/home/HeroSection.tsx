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
    <div className={`flex flex-wrap bg-[#161616] px-4 md:px-8 lg:px-12 pt-36 md:pt-48 pb-16 md:pb-24 ${jost.variable} ${fraunces.variable}`}>
      {/* First column - Text content */}
      <div className="w-full md:w-[44%] flex flex-col gap-0">
        <div>
          {/* Subtitle */}
          <div className="mb-5">
            <span className="text-[#b68c56] font-light text-base md:text-lg tracking-wider font-fraunces">
              À propos de nous
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-white text-2xl md:text-3xl lg:text-[38px] mb-8 font-fraunces uppercase">
            <span>Un RIAD DANS LA VILLE DES RÊVES DU DÉSERT</span>
          </h3>
        </div>
        
        {/* Description */}
        <div className="mb-8">
          <p className="text-[#d3d0cb] font-fraunces">
            Le Riad EMBERIZA SAHARI, situé au cœur de la Médina de Marrakech est un havre de tranquillité. Les origines du riad remontent au XIV° siècle. Niché parmi les monuments historiques qui définissent le paysage culturel de la ville
          </p>
        </div>
        
        {/* Button */}
        <div className="mt-7">
          <a 
            href="/riad" 
            className="inline-flex items-center justify-center h-[48px] px-8 bg-[#b68c56] text-white border border-[#b68c56] hover:brightness-110 transition-all duration-300 font-jost tracking-wide"
          >
            <span>Le Riad</span>
          </a>
        </div>
      </div>
      
      {/* Spacer column */}
      <div className="hidden md:block md:w-[4%]"></div>
      
      {/* First image column */}
      <div className="w-full md:w-[19%] flex z-10 mt-10 md:mt-0">
        <div className="relative w-full">
          <div className="mt-[100px] -mr-[100px] md:-mr-[150px] lg:-mr-[200px]">
            <div className="aspect-square relative overflow-hidden">
              <Image 
                src="/images/riad/riad-01.jpg"
                alt="IMG-20241115-WA0029"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Second image column */}
      <div className="w-full md:w-[33%] flex mt-10 md:mt-0">
        <div className="relative w-full">
          <div className="-mt-[100px]">
            <div className="aspect-square relative overflow-hidden">
              <Image 
                src="/images/riad/riad-02.jpg"
                alt="IMG-20241115-WA0038"
                fill
                className="object-cover"
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