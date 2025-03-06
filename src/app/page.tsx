'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import ImageCarousel from "@/components/ui/ImageCarousel";
import HeroSection from "@/components/home/HeroSection";
import Carousel from "@/components/home/Carousel";
import RoomsCarousel from "@/components/home/RoomCarousel";
import ServicesSection from "@/components/home/ServicesSection";

import Footer from "@/components/layout/Footer";

export default function Home() {
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window exists (client-side only)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Set initial value
      handleResize();

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const carouselImages = [
    {
      src: "/images/riad/riad-01.jpg",
      alt: "Riad Main View",
      title: "Riad Emberiza Sahari",
      description: "DÉCOUVREZ CE JOYAU NICHÉ AU CŒUR DE LA MÉDINA"
    },
    {
      src: "/images/riad/riad-02.jpg",
      alt: "Riad Pool",
      title: "La Piscine Exotique",
      description: "Plongez dans notre magnifique piscine entourée de palmiers et de plantes exotiques, un oasis de tranquillité dans l'agitation de la médina."
    },
  ];

  // Gallery carousel images
  const galleryImages = [
    {
      src: "/images/riad/riad-01.jpg",
      alt: "Patio Intérieur",
      title: "Patio Central",
      description: "Le cœur de notre riad avec sa fontaine traditionnelle et son architecture authentique"
    },
    {
      src: "/images/riad/riad-02.jpg",
      alt: "Suite Royale",
      title: "Suite Royale",
      description: "Notre suite la plus luxueuse avec décoration traditionnelle et salle de bain privative en marbre"
    },
    {
      src: "/images/riad/riad-03.jpg",
      alt: "Terrasse Panoramique",
      title: "Terrasse Panoramique",
      description: "Admirez la vue sur la médina et l'Atlas depuis notre terrasse aménagée"
    },
    {
      src: "/images/riad/riad-04.jpg",
      alt: "Salon Marocain",
      title: "Salon Marocain",
      description: "Détendez-vous dans notre salon traditionnel avec ses coussins et son artisanat local"
    },
    {
      src: "/images/riad/riad-05.jpg",
      alt: "Restaurant",
      title: "Restaurant",
      description: "Savourez les délices de notre cuisine marocaine dans un cadre élégant"
    }
  ];

  // Room data for the rooms carousel
  const roomsData = [
    {
      id: "suite-royale",
      image: "/images/riad/rooms/elisabeth.jpg",
      name: "Suite Royale",
      pricePerNight: "250€",
      adults: 2,
      size: "35m²",
      equipment: [
        { icon: "🛏️", name: "Lit King Size" },
        { icon: "🚿", name: "Salle de bain privative" },
        { icon: "❄️", name: "Climatisation" },
        { icon: "📶", name: "Wi-Fi gratuit" },
        { icon: "📺", name: "TV écran plat" },
        { icon: "🧴", name: "Produits d'accueil bio" }
      ]
    },
    {
      id: "chambre-deluxe",
      image: "/images/riad/rooms/maria.jpg",
      name: "Chambre Deluxe",
      pricePerNight: "180€",
      adults: 2,
      size: "28m²",
      equipment: [
        { icon: "🛏️", name: "Lit Queen Size" },
        { icon: "🚿", name: "Salle de bain privative" },
        { icon: "❄️", name: "Climatisation" },
        { icon: "📶", name: "Wi-Fi gratuit" },
        { icon: "🧴", name: "Produits d'accueil bio" }
      ]
    },
    {
      id: "chambre-standard",
      image: "/images/riad/rooms/geddes.jpg",
      name: "Chambre Standard",
      pricePerNight: "140€",
      adults: 2,
      size: "22m²",
      equipment: [
        { icon: "🛏️", name: "Lit Double" },
        { icon: "🚿", name: "Salle de bain privative" },
        { icon: "❄️", name: "Climatisation" },
        { icon: "📶", name: "Wi-Fi gratuit" }
      ]
    },
    {
      id: "suite-familiale",
      image: "/images/riad/rooms/olivia.jpg",
      name: "Suite Familiale",
      pricePerNight: "320€",
      adults: 4,
      size: "45m²",
      equipment: [
        { icon: "🛏️", name: "1 Lit King Size + 2 Lits Simples" },
        { icon: "🚿", name: "2 Salles de bain" },
        { icon: "❄️", name: "Climatisation" },
        { icon: "📶", name: "Wi-Fi gratuit" },
        { icon: "📺", name: "TV écran plat" },
        { icon: "🧴", name: "Produits d'accueil bio" },
        { icon: "🏊", name: "Accès piscine privée" }
      ]
    },
    {
      id: "suite-terrasse",
      image: "/images/riad/rooms/isadora.jpg",
      name: "Suite avec Terrasse",
      pricePerNight: "280€",
      adults: 2,
      size: "38m²",
      equipment: [
        { icon: "🛏️", name: "Lit King Size" },
        { icon: "🚿", name: "Salle de bain privative" },
        { icon: "❄️", name: "Climatisation" },
        { icon: "📶", name: "Wi-Fi gratuit" },
        { icon: "📺", name: "TV écran plat" },
        { icon: "🧴", name: "Produits d'accueil bio" },
        { icon: "🏞️", name: "Terrasse privée vue médina" }
      ]
    }
  ];

  // Scroll to top function for mobile
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />

      {/* Main content with proper section spacing */}
      <main>
        {/* Hero Carousel - optimized lazy loading for mobile */}
        <section>
          <ImageCarousel
            images={carouselImages}
            reducedMotion={isMobile} // Optional: reduce animations on mobile
          />
        </section>

        {/* Hero Section - already optimized in its component */}
        <section className="mb-8 md:mb-0">
          <HeroSection />
        </section>

        {/* Gallery Carousel */}
        <section className="mb-8 md:mb-12">
          <Carousel
            images={galleryImages}
            mobileOptimized={true} // Pass this to your carousel component
          />
        </section>

        {/* Rooms Carousel - already optimized */}
        <section className="mb-12 md:mb-16">
          <RoomsCarousel rooms={roomsData} />
        </section>
        <section>
          <ServicesSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* {isMobile && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-[#d1a163] text-white shadow-lg flex items-center justify-center z-40 translate-x-0"
          aria-label="Retour en haut"
          style={{ transform: 'translateX(0)' }} // Ensure no transform causing overflow
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )} */}
    </>
  );
}