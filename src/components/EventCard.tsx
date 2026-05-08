import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react';

interface EventCardProps {
  type: string;
  host: string;
  bodyText: string;
  honoree1: { name: string; subtitle: string };
  honoree2: { name: string; subtitle: string };
  culturalName: string;
  date: string;
  secondaryDate: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  delay?: number;
}

export const EventCard: React.FC<EventCardProps> = ({
  type, host, bodyText, honoree1, honoree2, culturalName, date, secondaryDate, time, venue, address, mapsUrl, delay = 0
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      className="glass-card rounded-2xl p-8 mb-12 relative overflow-hidden group"
    >
      {/* Decorative Islamic corner */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none rotate-90">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-accent-gold">
          <path d="M100 0 L100 100 L0 100 Q50 50 100 0 Z" />
        </svg>
      </div>
      
      <div className="text-center relative z-10">
        <span className="font-display text-accent-gold tracking-[0.5em] text-sm block mb-2">{type}</span>
        <h3 className="font-display text-text-maroon text-3xl mb-6">{culturalName}</h3>
        
        <p className="text-text-muted text-sm mb-4 font-italic">{host}</p>
        <p className="text-text-maroon/70 text-sm mb-8 leading-relaxed px-4">{bodyText}</p>
        
        <div className="flex flex-col gap-2 mb-8">
          <h4 className="text-2xl text-text-maroon font-serif italic">{honoree1.name}</h4>
          <p className="text-[10px] text-text-muted whitespace-pre-wrap leading-tight">{honoree1.subtitle}</p>
          <span className="text-accent-gold text-xl my-2">&</span>
          <h4 className="text-2xl text-text-maroon font-serif italic">{honoree2.name}</h4>
          <p className="text-[10px] text-text-muted whitespace-pre-wrap leading-tight">{honoree2.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 border-y border-accent-gold/20 py-8">
          <div className="flex flex-col items-center">
            <Calendar className="text-accent-gold w-5 h-5 mb-2" />
            <p className="text-text-maroon font-medium">{date}</p>
            <p className="text-text-muted text-xs">{secondaryDate}</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="text-accent-gold w-5 h-5 mb-2" />
            <p className="text-text-maroon">{time}</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="text-accent-gold w-5 h-5 mb-2" />
            <p className="text-text-maroon font-medium">{venue}</p>
            <p className="text-text-muted text-xs px-4 mt-1">{address}</p>
          </div>
        </div>

        <motion.a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-bg-primary rounded-full font-display text-xs tracking-widest font-bold hover:bg-accent-gold-light transition-colors"
        >
          VIEW ON GOOGLE MAPS
          <ExternalLink className="w-3 h-3" />
        </motion.a>
      </div>
    </motion.div>
  );
};
