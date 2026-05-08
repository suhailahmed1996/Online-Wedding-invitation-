import React from 'react';
import { motion } from 'motion/react';

export const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#f7f3ee] flex flex-col items-center justify-center"
    >
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M50 5 L60 35 L90 35 L65 55 L75 85 L50 65 L25 85 L35 55 L10 35 L40 35 Z"
            fill="none"
            stroke="#c6a25a"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Islamic Geometric Pattern Placeholder */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="#c6a25a"
            strokeWidth="0.2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-display text-accent-gold text-xs tracking-[0.3em] font-medium">BISMILLAH</span>
        </motion.div>
      </div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 font-display text-accent-gold-light text-sm tracking-widest"
      >
        PREPARING YOUR INVITATION
      </motion.p>
    </motion.div>
  );
};
