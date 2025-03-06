import { useState } from 'react';
import Image from 'next/image';
import { Jost } from 'next/font/google';

// Initialize the Jost font
const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
});

interface RoomEquipment {
  icon: string;
  name: string;
}

interface RoomCardProps {
  image: string;
  name: string;
  pricePerNight: string;
  adults: number;
  size: string;
  equipment: RoomEquipment[];
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  name,
  pricePerNight,
  adults,
  size,
  equipment
}) => {
  const [showEquipment, setShowEquipment] = useState(false);

  return (
    <div className={`${jost.className} w-[350px] bg-[#161616] rounded-sm overflow-hidden flex flex-col mx-2`}>
      {/* Room image */}
      <div className="relative w-full h-[220px]">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </div>
      
      {/* Price */}
      <div className="p-5 pb-3">
        <div className="text-[#d1a163] text-xl font-medium">
          {pricePerNight} <span className="text-sm text-white/70">/ nuit</span>
        </div>
      </div>
      
      {/* Room name */}
      <div className="px-5 pb-4">
        <h3 className="text-white text-lg font-medium">{name}</h3>
      </div>
      
      {/* Room details */}
      <div className="px-5 pb-5 flex justify-between items-center text-sm">
        {/* Adults */}
        <div className="flex items-center text-white/80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#d1a163]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>Adultes: {adults}</span>
        </div>
        
        {/* Equipment (with tooltip) */}
        <div className="relative">
          <div 
            className="flex items-center text-white/80 cursor-pointer"
            onMouseEnter={() => setShowEquipment(true)}
            onMouseLeave={() => setShowEquipment(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#d1a163]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>Equipement: ...</span>
          </div>
          
          {/* Equipment tooltip */}
          {showEquipment && (
            <div className="absolute z-30 bottom-full mb-2 left-0 w-[220px] bg-[#0c0c0c] shadow-lg p-3 rounded text-xs text-white/80">
              <div className="font-medium text-[#d1a163] mb-2">Équipements:</div>
              <ul className="space-y-1.5">
                {equipment.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute left-4 bottom-[-6px] w-3 h-3 bg-[#0c0c0c] transform rotate-45"></div>
            </div>
          )}
        </div>
        
        {/* Room size */}
        <div className="flex items-center text-white/80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#d1a163]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Taille: {size}</span>
        </div>
      </div>
      
      {/* Book button */}
      <div className="mt-auto px-5 pb-5">
        <button className="w-full bg-[#d1a163] hover:bg-[#c09253] text-white py-3 font-medium transition-colors">
          Réserver
        </button>
      </div>
    </div>
  );
};

export default RoomCard;