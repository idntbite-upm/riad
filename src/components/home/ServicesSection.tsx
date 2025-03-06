import React, { useState } from 'react';
import { Jost, Fraunces } from 'next/font/google';
import Image from 'next/image';

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

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image: string;
  linkText?: string;
  href?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  image,
  linkText = "En savoir plus",
  href = "#"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-[#161616] border border-[#2a2a2a] relative overflow-hidden rounded-sm h-[300px] md:h-[360px] transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 1000)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
      </div>

      {/* Icon */}
      <div className="absolute top-6 left-6 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#d1a163]/90 backdrop-blur-sm flex items-center justify-center text-white z-10 shadow-lg transition-transform duration-500 group-hover:scale-110">
        <span className="text-2xl md:text-3xl">{icon}</span>
      </div>

      {/* Content that moves up on hover */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 text-white z-10 transition-transform duration-500 ${isHovered ? 'translate-y-[-40px]' : 'translate-y-0'}`}>
        <h3 className={`text-xl md:text-2xl mb-2 font-medium ${fraunces.className}`}>{title}</h3>
        <p className={`text-sm md:text-base text-white/80 mb-6 line-clamp-3 ${jost.className}`}>
          {description}
        </p>
        <a 
          href={href} 
          className={`inline-flex items-center text-[#d1a163] text-sm md:text-base group-hover:underline ${jost.className} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        >
          {linkText}
          <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services: ServiceCardProps[] = [
    {
      icon: '🍽️',
      title: 'Restaurant Traditionnel',
      description: 'Savourez des plats traditionnels marocains préparés avec des ingrédients frais du marché. Nos tajines, couscous et pâtisseries sont élaborés selon des recettes ancestrales.',
      image: '/images/riad/services/restaurant.jpg',
      href: '/restaurant'
    },
    {
      icon: '💆',
      title: 'Spa & Hammam',
      description: `Détendez-vous dans notre hammam traditionnel et offrez-vous un soin relaxant. Nos massages aux huiles d'argan et rituels de beauté vous transporteront dans un moment de pure détente.`,
      image: '/images/riad/services/spa.jpg',
      href: '/spa'
    },
    {
      icon: '🚗',
      title: 'Transferts Aéroport',
      description: `Nous organisons votre transport depuis et vers l'aéroport pour un séjour sans stress. Notre chauffeur vous attendra à votre arrivée pour vous conduire directement au riad.`,
      image: '/images/riad/services/transfer.jpg',
      href: '/transfers'
    },
    {
      icon: '🏜️',
      title: 'Excursions & Visites',
      description: `Découvrez les merveilles de Marrakech et ses environs avec nos excursions personnalisées. De l'Atlas au désert, en passant par les souks animés, créez des souvenirs inoubliables.`,
      image: '/images/riad/services/excursion.jpg',
      href: '/excursions'
    },
    {
      icon: '👨‍🍳',
      title: 'Cours de Cuisine',
      description: `Apprenez à préparer d'authentiques plats marocains lors de nos cours de cuisine. Vous découvrirez les secrets des épices et techniques culinaires traditionnelles avec notre chef.`,
      image: '/images/riad/services/cooking.jpg',
      href: '/cooking-classes'
    },
    {
      icon: '🎭',
      title: 'Soirées Folkloriques',
      description: `Immergez-vous dans la culture marocaine avec nos soirées folkloriques. Musique, danse et spectacles traditionnels vous feront vivre l'authenticité de la culture berbère et arabe.`,
      image: '/images/riad/services/entertainment.jpg',
      href: '/entertainment'
    }
  ];

  return (
    <div className={`bg-[#0c0c0c] py-16 md:py-24 ${jost.variable} ${fraunces.variable}`}>
      <div className="max-w-[1300px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#d1a163] text-base md:text-lg tracking-wider font-fraunces">
            DÉCOUVREZ
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-white mt-2 mb-4 font-fraunces">
            Nos Services
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg font-jost">
            Profitez d'un séjour exceptionnel avec notre gamme complète de services personnalisés pour rendre votre expérience authentique et mémorable.
          </p>
        </div>

        {/* Services Grid - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon}
              title={service.title}
              description={service.description}
              image={service.image}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;