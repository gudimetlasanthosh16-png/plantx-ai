import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HeroRight: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center select-none">
      
      {/* 1. Ambient Sunbeam & Atmosphere Glows behind the 3D Island */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[560px] h-[340px] sm:h-[480px] lg:h-[560px] rounded-full bg-gradient-to-tr from-emerald-400/25 via-teal-300/20 to-sky-200/20 blur-3xl pointer-events-none -z-10 animate-pulse" 
        style={{ animationDuration: '4.5s' }}
      />
      
      <div 
        className="absolute -top-12 -right-8 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none -z-20"
      />

      {/* 2. Floating 3D Island Container (Frameless, Zero Box, Zero Borders) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [-10, 10, -10],
          rotate: [-0.4, 0.4, -0.4]
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.2 },
          scale: { duration: 0.8, delay: 0.2 },
          y: { duration: 6.5, ease: 'easeInOut', repeat: Infinity },
          rotate: { duration: 8, ease: 'easeInOut', repeat: Infinity }
        }}
        className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[620px] flex items-center justify-center"
      >
        
        {/* The 3D Element (Feathered Radial Mask: removes all rectangular video boundaries) */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 88% 80% at 50% 48%, black 52%, black 68%, transparent 96%)',
            maskImage: 'radial-gradient(ellipse 88% 80% at 50% 48%, black 52%, black 68%, transparent 96%)'
          }}
        >
          {/* Realistic 3D Video Loop: Blends seamlessly with website canvas */}
          <video
            src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_green_energy.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-contain mix-blend-multiply contrast-[1.12] brightness-[1.04] transition-opacity duration-700"
            style={{ opacity: isVideoLoaded ? 1 : 0.85 }}
          />
        </div>

        {/* 3. REALISTIC WATER POURING DOWN & VOLUMETRIC CLOUDS SYSTEM */}
        
        {/* Waterfall Lower Stream Extension: Shimmering water ribbons flowing down into clouds */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[60%] sm:w-[50%] h-28 pointer-events-none overflow-hidden -z-5">
          {/* Water Stream Left */}
          <motion.div
            animate={{
              opacity: [0.6, 0.9, 0.6],
              scaleY: [0.95, 1.15, 0.95],
              y: [0, 8, 0]
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[28%] top-0 w-8 h-24 bg-gradient-to-b from-sky-300/40 via-teal-200/30 to-transparent blur-sm rounded-b-full"
          />
          {/* Water Stream Right */}
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
              scaleY: [1, 1.2, 1],
              y: [0, 10, 0]
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute right-[26%] top-0 w-10 h-28 bg-gradient-to-b from-sky-200/50 via-cyan-100/40 to-transparent blur-sm rounded-b-full"
          />
        </div>

        {/* Realistic Volumetric Cloud Bank Layer 1 (Base Cloud Bank where water plunges) */}
        <motion.div
          animate={{
            x: [-8, 8, -8],
            scale: [1, 1.05, 1],
            opacity: [0.85, 0.95, 0.85]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-4 sm:-bottom-8 left-1/2 -translate-x-1/2 w-[85%] sm:w-[75%] h-28 sm:h-36 pointer-events-none"
        >
          {/* Cloud Puff Left */}
          <div className="absolute left-[5%] bottom-2 w-44 sm:w-60 h-24 sm:h-32 rounded-full bg-gradient-to-t from-white/95 via-white/80 to-transparent blur-2xl" />
          {/* Cloud Puff Center-Right (Directly under main waterfall) */}
          <div className="absolute left-[30%] -bottom-2 w-56 sm:w-76 h-28 sm:h-36 rounded-full bg-gradient-to-t from-white/95 via-sky-50/80 to-transparent blur-2xl" />
          {/* Cloud Puff Right */}
          <div className="absolute right-[2%] bottom-0 w-48 sm:w-64 h-24 sm:h-32 rounded-full bg-gradient-to-t from-white/90 via-emerald-50/70 to-transparent blur-2xl" />
        </motion.div>

        {/* Realistic Volumetric Cloud Bank Layer 2 (Drifting Upper Mist & Spray) */}
        <motion.div
          animate={{
            x: [6, -6, 6],
            scale: [1.02, 0.98, 1.02],
            opacity: [0.75, 0.9, 0.75]
          }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-1 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] h-24 pointer-events-none"
        >
          {/* Center Dense Mist Puff */}
          <div className="absolute left-[20%] bottom-0 w-64 sm:w-88 h-20 sm:h-26 rounded-full bg-white/70 blur-xl" />
          {/* Soft Emerald Atmospheric Edge */}
          <div className="absolute right-[15%] bottom-1 w-52 sm:w-72 h-18 sm:h-22 rounded-full bg-emerald-100/50 blur-xl" />
        </motion.div>

        {/* Waterfall Splash Mist Particles Rising from the Clouds */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[65%] h-20 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
              style={{
                width: i % 2 === 0 ? '4px' : '6px',
                height: i % 2 === 0 ? '4px' : '6px',
                left: `${25 + i * 9}%`,
                bottom: '15px'
              }}
              animate={{
                y: [-4, -30 - (i * 5), -4],
                x: [0, (i % 2 === 0 ? 8 : -8), 0],
                opacity: [0, 0.85, 0],
                scale: [0.6, 1.3, 0.4]
              }}
              transition={{
                duration: 2.8 + (i * 0.4),
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.45
              }}
            />
          ))}
        </div>

      </motion.div>

    </div>
  );
};

export default HeroRight;
