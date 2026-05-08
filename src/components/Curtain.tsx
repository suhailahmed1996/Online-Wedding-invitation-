import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Curtain = ({ isOpen, onOpen }: { isOpen: boolean; onOpen: () => void }) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex overflow-hidden"
        >
          {/* Left Curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={isOpen ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 2, ease: [0.45, 0, 0.55, 1] }}
            className="w-1/2 h-full velvet-texture shadow-[inset_-20px_0_40px_rgba(0,0,0,0.5)] border-r border-[#c6a25a]/30 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 pointer-events-none" />
            {/* Curtain Folds */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.4) 50px, rgba(0,0,0,0.4) 100px)' }}>
            </div>
          </motion.div>

          {/* Right Curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={isOpen ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 2, ease: [0.45, 0, 0.55, 1] }}
            className="w-1/2 h-full velvet-texture shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)] border-l border-[#c6a25a]/30 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/40 pointer-events-none" />
            {/* Curtain Folds */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.4) 50px, rgba(0,0,0,0.4) 100px)' }}>
            </div>
          </motion.div>

          {/* Center Tassel */}
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] group flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-accent-gold border-4 border-accent-gold-light shadow-[0_0_30px_rgba(198,162,90,0.8)] flex items-center justify-center cursor-pointer group-hover:shadow-[0_0_50px_rgba(198,162,90,1)] transition-all">
              <div className="w-10 h-10 border-2 border-white/30 rounded-full animate-pulse" />
            </div>
            <span className="mt-4 font-display tracking-widest text-[#e7c980] text-sm brightness-150 drop-shadow-lg">TAP TO OPEN</span>
          </motion.button>
          
          {/* Light Behind Curtains */}
          <div className="absolute inset-0 bg-[#fef3c7]/5 blur-[100px] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
