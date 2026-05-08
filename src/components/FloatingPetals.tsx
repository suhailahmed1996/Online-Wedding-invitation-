import React from 'react';
import { motion } from 'motion/react';

export const FloatingPetals = () => {
  const petals = Array.from({ length: 28 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((_, i) => {
        const size = Math.random() * 20 + 10;
        const startX = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            initial={{ 
              top: '-10%', 
              left: `${startX}%`, 
              opacity: 0,
              rotate: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              top: '110%',
              left: `${startX + (Math.random() * 20 - 10)}%`,
              opacity: [0, 0.7, 0.7, 0],
              rotate: 360,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear"
            }}
            className="absolute"
            style={{ width: size, height: size }}
          >
            <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
              <path
                d="M25 0C25 0 0 25 25 50C25 50 50 25 25 0Z"
                fill={i % 2 === 0 ? "#fbcfe8" : "#f472b6"}
                fillOpacity="0.6"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};
