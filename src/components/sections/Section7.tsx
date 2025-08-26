'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Section7Props {
  onComplete?: () => void;
}

export default function Section7({}: Section7Props) {
  const [displayedHeader, setDisplayedHeader] = useState('');
  const [displayedSubheader, setDisplayedSubheader] = useState('');
  const [displayedFinalThought, setDisplayedFinalThought] = useState('');
  const [headerIndex, setHeaderIndex] = useState(0);
  const [subheaderIndex, setSubheaderIndex] = useState(0);
  const [finalThoughtIndex, setFinalThoughtIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const headerText = "After all, art is everywhere.";
  const introText = "Needless to say, with how fast the technology is improving, websites are also everywhere. Moving forward, I'd like to see how people will open up to the discussion of whether or not to consider a website an art form, similar to how they do with sculptures, literature, film, among many others.";
  const finalThought = "After all, I have always considered it as so.";

  // Helper function to get typing delay based on the previous character
  const getTypingDelay = (prevChar: string) => {
    if (prevChar === '.' || prevChar === '!') return 800; // Longer pause after sentence endings
    if (prevChar === ',') return 400; // Medium pause after commas
    return 40; // Normal typing speed
  };

  // Typewriter effect for header text
  useEffect(() => {
    if (isInView && headerIndex < headerText.length) {
      const currentChar = headerText[headerIndex];
      const prevChar = headerIndex > 0 ? headerText[headerIndex - 1] : '';
      const delay = getTypingDelay(prevChar);
      
      const timer = setTimeout(() => {
        setDisplayedHeader(prev => prev + currentChar);
        setHeaderIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, headerIndex, headerText]);

  // Typewriter effect for subheader text (starts after header is complete)
  useEffect(() => {
    if (headerIndex >= headerText.length && subheaderIndex < introText.length) {
      const currentChar = introText[subheaderIndex];
      const prevChar = subheaderIndex > 0 ? introText[subheaderIndex - 1] : '';
      const delay = getTypingDelay(prevChar);
      
      const timer = setTimeout(() => {
        setDisplayedSubheader(prev => prev + currentChar);
        setSubheaderIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [headerIndex, headerText, subheaderIndex, introText]);

  // Typewriter effect for final thought (starts after subheader is complete)
  useEffect(() => {
    if (subheaderIndex >= introText.length && finalThoughtIndex < finalThought.length) {
      const currentChar = finalThought[finalThoughtIndex];
      const prevChar = finalThoughtIndex > 0 ? finalThought[finalThoughtIndex - 1] : '';
      const delay = getTypingDelay(prevChar);
      
      const timer = setTimeout(() => {
        setDisplayedFinalThought(prev => prev + currentChar);
        setFinalThoughtIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [subheaderIndex, introText, finalThoughtIndex, finalThought]);



  // Generate stars for space effect
  const stars = useMemo(() => {
    const starData = [];
    for (let i = 0; i < 80; i++) {
      starData.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 200,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 0.3 + 0.2
      });
    }
    return starData;
  }, []);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const setupTimer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        },
        { threshold: 0.3 }
      );

      const sectionElement = document.getElementById('section7');
      if (sectionElement) {
        observer.observe(sectionElement);
      }

      // Fallback: start typing after 1 second if intersection observer doesn't work
      const fallbackTimer = setTimeout(() => {
        if (!isInView) {
          setIsInView(true);
        }
      }, 1000);

      return () => {
        if (sectionElement) {
          observer.unobserve(sectionElement);
        }
        clearTimeout(fallbackTimer);
      };
    }, 100);

    return () => clearTimeout(setupTimer);
  });

  return (
    <div id="section7" className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background stars - moon atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
            animate={{
              y: [star.y, star.y + 200],
              opacity: [0.2, 0.1, 0]
            }}
            transition={{
              duration: 6 / star.speed,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Moon atmosphere glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-400/20 via-transparent to-transparent" />

      
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main content area */}
        <div className="min-h-screen flex flex-col justify-center px-8">

          {/* Main header */}
          <motion.div 
            className="text-center h-screen flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="text-6xl font-bold text-white font-lexend leading-tight">
              {displayedHeader}
              {headerIndex < headerText.length && <span className="animate-pulse text-white">|</span>}
            </h1>
          </motion.div>

          {/* Subheader */}
          <motion.div 
            className="text-center h-screen flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-2xl leading-relaxed text-slate-100 max-w-4xl mx-auto">
              {displayedSubheader}
              {subheaderIndex < introText.length && <span className="animate-pulse text-white">|</span>}
            </p>
          </motion.div>

          {/* Moon image */}
          <motion.div 
            className="w-full h-screen flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.2, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 3, duration: 2, ease: "easeOut" }}
          >
            <Image 
              src="/moon.png" 
              alt="Moon" 
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Final thought - the last part of the essay */}
          <motion.div 
            className="text-center h-screen flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 1 }}
          >
            <p className="text-4xl font-bold text-white max-w-4xl mx-auto font-lexend leading-relaxed">
              {displayedFinalThought}
              {finalThoughtIndex > 0 && finalThoughtIndex < finalThought.length && <span className="animate-pulse text-white">|</span>}
            </p>
          </motion.div>

                     {/* Portfolio and links section */}
           <motion.div 
             className="text-center h-screen flex flex-col justify-center"
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 4, duration: 1 }}
           >
             {/* Description above credentials */}
             <motion.p 
               className="text-lg text-slate-300 mb-8"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 4.3, duration: 0.5 }}
             >
               An Art Appreciation Essay in Website Form
             </motion.p>
             
             {/* Signature and role */}
             <div className="mb-12">
               <motion.div
                 className="w-64 h-1 bg-white mx-auto mb-4"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ delay: 4.5, duration: 1 }}
               />
               <motion.h2 
                 className="text-3xl font-bold mb-2 font-lexend"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 5, duration: 0.5 }}
               >
                 Diesta, Edward Joshua M.
               </motion.h2>
               <motion.p 
                 className="text-xl text-slate-200"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 5.2, duration: 0.5 }}
               >
                 Web Developer, Artist, and Ateneo Student
               </motion.p>
               <motion.div
                 className="w-64 h-1 bg-white mx-auto mt-4"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ delay: 5.5, duration: 1 }}
               />
             </div>

            {/* Portfolio and GitHub links - single row */}
            <div className="flex justify-center items-center gap-8 mb-16">
              <motion.a
                href="https://github.com/DrawdEA/art-ap-website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-slate-300 text-xl font-light transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Code
              </motion.a>

              <motion.a
                href="https://diesta.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-slate-300 text-xl font-light transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6.5, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                My Portfolio
              </motion.a>

              <motion.button
                onClick={() => window.location.reload()}
                className="text-white hover:text-slate-300 text-xl font-light transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 7, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Restart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
