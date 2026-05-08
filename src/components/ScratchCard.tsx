import React, { useEffect, useRef, useState } from 'react';

interface ScratchCardProps {
  onComplete: () => void;
  children: React.ReactNode;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ onComplete, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fillCanvas = () => {
      // Gold foil effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#c6a25a');
      gradient.addColorStop(0.5, '#e7c980');
      gradient.addColorStop(1, '#c6a25a');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some texture
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.globalAlpha = 1.0;

      // Add label
      ctx.font = '20px Cinzel';
      ctx.fillStyle = '#3b0a0f';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCRATCH TO REVEAL', canvas.width / 2, canvas.height / 2);
    };

    fillCanvas();
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percent = (transparentPixels / (canvas.width * canvas.height)) * 100;
    if (percent > 60) {
      setIsRevealed(true);
      onComplete();
    }
  };

  return (
    <div className="relative w-full max-w-sm aspect-[4/3] mx-auto rounded-lg overflow-hidden glass-card shadow-2xl">
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        {children}
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="absolute inset-0 w-full h-full cursor-pointer scratch-canvas"
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseMove={handleMove}
          onTouchStart={() => setIsScratching(true)}
          onTouchEnd={() => setIsScratching(false)}
          onTouchMove={handleMove}
        />
      )}
    </div>
  );
};
