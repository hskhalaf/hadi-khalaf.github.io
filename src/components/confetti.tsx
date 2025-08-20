"use client";

import { useEffect, useState } from 'react';

interface ConfettiProps {
  isActive: boolean;
}

export function Confetti({ isActive }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
  }>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Create confetti particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 0,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 3 + 2,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)],
      size: Math.random() * 4 + 2,
    }));

    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.1, // gravity
        })).filter(particle => particle.y < 100 && particle.x > -10 && particle.x < 110)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `rotate(${particle.x * 2}deg)`,
          }}
        />
      ))}
    </div>
  );
}
