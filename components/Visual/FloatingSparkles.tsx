'use client';

import React, { useMemo } from 'react';

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
  type: 'star' | 'dust' | 'cross';
}

export default function FloatingSparkles() {
  // Precompute random particles for a stable, elegant starfield
  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    // 24 ambient twinkling stars and golden dust
    const seedPoints = [
      { t: 12, l: 8, s: 14, d: '0s', dur: '4s', type: 'star' },
      { t: 22, l: 18, s: 4, d: '1.2s', dur: '5s', type: 'dust' },
      { t: 16, l: 32, s: 18, d: '2.5s', dur: '6s', type: 'cross' },
      { t: 28, l: 45, s: 5, d: '0.8s', dur: '4.5s', type: 'dust' },
      { t: 14, l: 68, s: 16, d: '1.8s', dur: '5.2s', type: 'star' },
      { t: 25, l: 82, s: 4, d: '3.1s', dur: '6.5s', type: 'dust' },
      { t: 18, l: 92, s: 15, d: '0.4s', dur: '4.8s', type: 'cross' },
      { t: 38, l: 12, s: 5, d: '2.1s', dur: '5.5s', type: 'dust' },
      { t: 44, l: 24, s: 12, d: '1.5s', dur: '4.2s', type: 'star' },
      { t: 36, l: 76, s: 14, d: '2.9s', dur: '5.8s', type: 'cross' },
      { t: 48, l: 88, s: 4, d: '0.7s', dur: '4.6s', type: 'dust' },
      { t: 55, l: 6, s: 15, d: '3.4s', dur: '6.2s', type: 'star' },
      { t: 62, l: 16, s: 4, d: '1.1s', dur: '5s', type: 'dust' },
      { t: 58, l: 84, s: 13, d: '2.2s', dur: '5.3s', type: 'star' },
      { t: 65, l: 94, s: 4, d: '0.5s', dur: '4.7s', type: 'dust' },
      { t: 72, l: 28, s: 16, d: '1.9s', dur: '6s', type: 'cross' },
      { t: 78, l: 72, s: 12, d: '2.7s', dur: '5.1s', type: 'star' },
      { t: 84, l: 48, s: 5, d: '1.4s', dur: '4.4s', type: 'dust' },
      { t: 88, l: 15, s: 14, d: '3.0s', dur: '5.7s', type: 'star' },
      { t: 82, l: 86, s: 15, d: '0.9s', dur: '4.9s', type: 'cross' },
    ];

    return seedPoints.map((p, idx) => ({
      id: idx,
      top: `${p.t}%`,
      left: `${p.l}%`,
      size: p.s,
      delay: p.d,
      duration: p.dur,
      opacity: 0.85,
      type: p.type as 'star' | 'dust' | 'cross',
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      
      {/* 1. Animated Gliding Luxury Golden Airplane & Contrail */}
      <div className="avelora-sky-flight">
        <div className="relative flex items-center">
          {/* Luminous Jet Stream / Golden Stardust Contrail */}
          <div className="w-48 sm:w-72 h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-gold-300 shadow-[0_0_8px_rgba(223,191,133,0.7)]" />
          
          {/* Airplane Motif */}
          <div className="relative -ml-1 text-gold-300 filter drop-shadow-[0_0_10px_rgba(223,191,133,0.9)] animate-pulse">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transform rotate-45"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
        </div>
      </div>

      {/* 2. Twinkling Golden Stars & Stardust Particles */}
      {particles.map((p) => {
        if (p.type === 'star') {
          return (
            <div
              key={p.id}
              className="absolute animate-twinkle text-gold-300 drop-shadow-[0_0_8px_rgba(223,191,133,0.8)]"
              style={{
                top: p.top,
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            >
              {/* 4-Point Star Diamond */}
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
          );
        }

        if (p.type === 'cross') {
          return (
            <div
              key={p.id}
              className="absolute animate-twinkle text-gold-400 drop-shadow-[0_0_6px_rgba(198,163,106,0.6)]"
              style={{
                top: p.top,
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            >
              {/* Elegant Sparkle Cross */}
              <svg width={p.size} height={p.size} viewBox="0 0 20 20" fill="currentColor">
                <circle cx="10" cy="10" r="2.5" />
                <path d="M10 0V20M0 10H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          );
        }

        // Gold Dust Particle
        return (
          <div
            key={p.id}
            className="absolute rounded-full bg-gold-300/80 animate-float-dust shadow-[0_0_6px_rgba(223,191,133,0.8)]"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        );
      })}

      {/* 3. Golden Ambient Radial Glow (Breathing light in the sky) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial from-gold-500/15 via-gold-600/5 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none" />
    </div>
  );
}

