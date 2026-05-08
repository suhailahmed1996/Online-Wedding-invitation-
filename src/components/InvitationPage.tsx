import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, ChevronDown, Music, Music2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatGuestName } from '../lib/utils';
import { Curtain } from './Curtain';
import { Loader } from './Loader';
import { FloatingPetals } from './FloatingPetals';
import { ScratchCard } from './ScratchCard';
import { EventCard } from './EventCard';

export const InvitationPage = () => {
  const { guestSlug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenCurtain = () => {
    setIsCurtainOpen(true);
    // Start music after curtain reveal if no error
    if (!audioError) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => {
            console.error("Audio play failed:", e);
            setAudioError(true);
            setIsMusicPlaying(false);
          });
          setIsMusicPlaying(true);
        }
      }, 1000);
    }
  };

  const handleScratchComplete = () => {
    setHasScratched(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c6a25a', '#e7c980', '#fef3c7']
    });
  };

  const shareInvitation = () => {
    const text = `You are cordially invited to the wedding of Kaiser & Ather. View invitation: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="min-h-screen relative bg-bg-primary overflow-x-hidden">
      <audio 
        ref={audioRef}
        src="https://www.chosic.com/wp-content/uploads/2021/07/The-Gentle-Spring.mp3"
        loop
        preload="auto"
        onError={(e) => {
          console.error("Audio Load Error:", e);
          setAudioError(true);
        }}
      />
      <AnimatePresence>
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <Curtain isOpen={isCurtainOpen} onOpen={handleOpenCurtain} />

      {isCurtainOpen && (
        <>
          <FloatingPetals />

          {/* Music Control - Only show if audio is available and no error */}
          {!audioError && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={toggleMusic}
              className="fixed top-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full glass-card border-accent-gold text-accent-gold"
            >
              <div className="relative">
                {isMusicPlaying ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Music2 className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <Music className="w-6 h-6 opacity-50" />
                )}
                {isMusicPlaying && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 -m-2 rounded-full border border-accent-gold/40"
                  />
                )}
              </div>
            </motion.button>
          )}

          {/* Share Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={shareInvitation}
            className="fixed top-6 left-6 z-40 w-12 h-12 flex items-center justify-center rounded-full glass-card border-accent-gold text-accent-gold"
          >
            <Share2 className="w-6 h-6" />
          </motion.button>

          {/* Main Content */}
          <main className="container mx-auto px-6 pt-16 pb-20 relative z-10 max-w-2xl">
            {/* Opening Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center mb-16"
            >
              <h1 className="text-3xl font-display text-accent-gold mb-4">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
              <p className="text-accent-gold-light/60 text-xs tracking-[0.2em]">In the Name of Almighty Allah, The Most Gracious, The Most Merciful.</p>
            </motion.div>

            {/* Personalized Guest Greeting */}
            {guestSlug && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center mb-16"
              >
                <p className="font-display text-accent-gold-light tracking-widest text-sm mb-2">DEAREST</p>
                <h2 className="text-4xl text-accent-gold font-medium italic">{formatGuestName(guestSlug)}</h2>
                <p className="text-[10px] text-accent-gold-light/60 tracking-[0.2em] mt-2 uppercase">
                  You are cordially invited to the wedding of
                </p>
                <div className="w-12 h-[1px] bg-accent-gold/30 mx-auto mt-6" />
              </motion.div>
            )}

            {/* Hero Section */}
            <section className="mb-16">
              {/* Couple Portrait */}
              <div className="relative w-full max-w-lg mx-auto mb-12">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="relative group"
                >
                  {/* Subtle Glow behind portrait */}
                  <div className="absolute inset-0 bg-accent-gold/5 blur-[80px] rounded-full scale-110 pointer-events-none" />
                  
                  {/* Portrait Container */}
                  <motion.div
                    animate={{ 
                      y: [0, -12, 0],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="relative z-10 w-full aspect-[4/5] flex items-center justify-center"
                  >
                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 bg-radial-gradient from-accent-gold/10 to-transparent blur-[100px] pointer-events-none" />
                    
                    <img 
                      src={imageError ? "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2000&auto=format&fit=crop" : "/couple-portrait.png"} 
                      alt="Kaiser and Ather" 
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      referrerPolicy="no-referrer"
                      className={`max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-1000 ${imageLoaded || imageError ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className="text-center">
                <motion.div
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   className="flex flex-col items-center"
                >
                  <motion.h2 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl md:text-6xl gold-gradient font-display tracking-widest mb-4"
                  >
                    KAISER SULTANA
                  </motion.h2>
                  <span className="text-accent-gold-light text-2xl font-serif italic my-4">&</span>
                  <motion.h2 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="text-4xl md:text-5xl gold-gradient font-display tracking-widest"
                  >
                    MOHAMED ATHER KAMRAN
                  </motion.h2>
                </motion.div>
                
                <div className="flex justify-center mt-16">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 opacity-40"
                  >
                    <span className="text-[10px] tracking-[0.3em] font-display text-accent-gold">SCROLL TO INVITE</span>
                    <ChevronDown className="w-4 h-4 text-accent-gold" />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Countdown Section */}
            <Countdown date="2026-05-31T16:00:00" />

            {/* Scratch to Reveal */}
            <section className="mb-20 px-4">
              <div className="text-center mb-12">
                <h3 className="font-display text-accent-gold tracking-[0.3em] text-sm mb-4">REVEAL THE MOMENT</h3>
                <div className="w-24 h-[1px] bg-accent-gold/20 mx-auto" />
              </div>
              
              <ScratchCard onComplete={handleScratchComplete}>
                <div className="text-text-maroon">
                  <p className="font-display text-sm tracking-widest mb-2 opacity-60">SAVE THE DATE</p>
                  <p className="text-4xl font-display mb-2">MAY 31</p>
                  <p className="text-sm tracking-widest">2026 • NANDI HIGHLANDS</p>
                </div>
              </ScratchCard>
              
              {hasScratched && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-6 text-accent-gold-light/60 text-xs tracking-widest"
                >
                  YOU'RE INVITED TO SHARE OUR JOY
                </motion.p>
              )}
            </section>

            {/* Event Details */}
            <section className="mb-20">
              <EventCard
                type="NIKKAH"
                host="Mrs. Mehtab Begum"
                bodyText="Invites you and your family to the Nikkah of her eldest daughter"
                honoree1={{ 
                  name: "Kaiser Sultana", 
                  subtitle: "D/O. Late Janab Basheeruddin Saheb\nPaternal Grand D/O. Late Shaikh Mehboob Saheb\nMaternal Grand D/O. Late Ameerulla Khan Saheb\nSister of Faizuddin and Salauddin" 
                }}
                honoree2={{ 
                  name: "Mohamed Ather Kamran", 
                  subtitle: "S/O. Khalida Banu & Late Janab K. Junaid Ahmed Saheb" 
                }}
                culturalName="نِكَاح"
                date="Sunday, 31st May 2026"
                secondaryDate="1 Shawwal 1447 AH"
                time="4:00 PM, After Salatul Asr"
                venue="Nandi Highlands"
                address="Kempathimmanahalli, Devanahalli, Karnataka 562103"
                mapsUrl="https://www.google.com/maps?q=Nandi+Highlands+Devanahalli"
              />

              <EventCard
                type="WALIMAH"
                host="Mrs. Khalida Banu"
                bodyText="Invites you and your family to the Walimah of her youngest son"
                honoree1={{ 
                  name: "Mohamed Ather Kamran", 
                  subtitle: "S/O. Late K. Junaid Ahmed Saheb\nPaternal Grand S/O Late Ahmed Saheb\nMaternal Grand S/O Late Adam Saheb" 
                }}
                honoree2={{ 
                  name: "Kaiser Sultana", 
                  subtitle: "D/O. Late Janab Basheeruddin Saheb & Mehtab Begum" 
                }}
                culturalName="وليمة"
                date="Sunday, 31st May 2026"
                secondaryDate="1 Shawwal 1447 AH"
                time="Dinner Followed After Nikkah"
                venue="Nandi Highlands"
                address="Kempathimmanahalli, Devanahalli, Karnataka 562103"
                mapsUrl="https://www.google.com/maps?q=Nandi+Highlands+Devanahalli"
                delay={0.2}
              />
            </section>

            {/* Closing Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center border-t border-accent-gold/20 pt-20"
            >
              <h3 className="text-accent-gold-light italic text-lg mb-8 px-8 leading-relaxed">
                "May Almighty Allah bless this marriage with love, happiness, understanding, good health, and endless prosperity."
              </h3>
              <div className="flex flex-col items-center gap-4">
                <span className="text-3xl text-accent-gold font-display">آمِيْن</span>
                <span className="text-sm tracking-[0.5em] text-accent-gold-light uppercase">Ameen</span>
              </div>
            </motion.section>
          </main>
        </>
      )}
    </div>
  );
};

const Countdown = ({ date }: { date: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex justify-center gap-4 mb-16 px-4">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="glass-card w-16 h-20 md:w-20 md:h-24 rounded-xl flex flex-col items-center justify-center shadow-lg">
          <span className="text-2xl md:text-3xl text-text-maroon font-display">{value}</span>
          <span className="text-[8px] md:text-[10px] text-text-muted tracking-widest uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
};
