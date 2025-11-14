// src/components/Layouts/FallingHearts.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const rand = (min, max) => Math.random() * (max - min) + min;

const FallingHearts = ({ count = 15, maxFont = 40, minFont = 18 }) => {
  // generate random properties once per mount
  const items = useMemo(() => {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    return Array.from({ length: count }).map(() => ({
      char: hearts[Math.floor(Math.random() * hearts.length)],
      left: `${rand(0, 100)}%`,
      fontSize: `${Math.round(rand(minFont, maxFont))}px`,
      duration: rand(6, 14),
      delay: rand(0, 6),
      // finalY is how far down it falls (px)
      finalY: rand(700, 1400),
      rotate: rand(-45, 45),
      opacityKeyframes: [0, 0.9, 0.9, 0],
    }));
  }, [count, maxFont, minFont]);

  return (
    <div className="falling-hearts-container" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="falling-heart"
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{ y: it.finalY, opacity: it.opacityKeyframes, rotate: it.rotate }}
          transition={{
            y: { duration: it.duration, ease: 'linear', repeat: Infinity, repeatType: 'loop', delay: it.delay },
            opacity: { duration: it.duration, times: [0, 0.2, 0.8, 1], repeat: Infinity, delay: it.delay },
            rotate: { duration: it.duration * 0.9, repeat: Infinity, ease: 'linear', delay: it.delay },
          }}
          style={{
            left: it.left,
            fontSize: it.fontSize,
            position: 'absolute',
            top: '-100px',
            transformOrigin: 'center',
            willChange: 'transform, opacity',
            userSelect: 'none',
            display: 'inline-block',
          }}
        >
          {it.char}
        </motion.div>
      ))}
    </div>
  );
};

// Named export (so imports using curly braces work)
export { FallingHearts };

// Default export (so default import without braces also works)
export default FallingHearts;
