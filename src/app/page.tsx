'use client';

import Image from "next/image";
import Header from "@/components/layout/Header";
import ImageCarousel from "@/components/ui/ImageCarousel";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  
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

  return (
    <div >
      <Header />
      <ImageCarousel images={carouselImages} />
      <HeroSection />
    </div>
  );
}
