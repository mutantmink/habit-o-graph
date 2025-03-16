
import React from 'react';
import { Cat, Dog, Fish, Rabbit, Bird } from 'lucide-react';
import { cn } from '@/lib/utils';

const animalComponents = {
  cat: Cat,
  dog: Dog,
  fish: Fish,
  rabbit: Rabbit,
  bird: Bird,
};

type AnimalType = keyof typeof animalComponents;

interface AnimalProps {
  type: AnimalType;
  position: string;
  size?: number;
  color?: string;
  rotate?: number;
  className?: string;
}

const CuteAnimal: React.FC<AnimalProps> = ({ 
  type, 
  position, 
  size = 24, 
  color = "#9333ea", 
  rotate = 0,
  className
}) => {
  const AnimalIcon = animalComponents[type];
  
  return (
    <div 
      className={cn(
        "absolute opacity-70 hover:opacity-100 transition-all duration-300 animate-float",
        position,
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <AnimalIcon size={size} color={color} className="drop-shadow-md" />
    </div>
  );
};

const CuteAnimals = () => {
  return (
    <>
      <CuteAnimal 
        type="cat" 
        position="top-10 right-10" 
        size={32} 
        color="#9333ea" 
      />
      <CuteAnimal 
        type="dog" 
        position="bottom-16 left-14" 
        size={28} 
        color="#7e22ce" 
        rotate={-10}
      />
      <CuteAnimal 
        type="rabbit" 
        position="top-28 left-20" 
        size={24} 
        color="#6b21a8" 
        rotate={15}
      />
      <CuteAnimal 
        type="bird" 
        position="bottom-24 right-20" 
        size={22} 
        color="#8b5cf6" 
        rotate={-5}
      />
      <CuteAnimal 
        type="fish" 
        position="top-1/2 left-12" 
        size={20} 
        color="#a855f7" 
        rotate={20}
      />
    </>
  );
};

export default CuteAnimals;
