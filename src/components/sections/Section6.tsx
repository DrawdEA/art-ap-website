'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Section6Props {
  onComplete: () => void;
}

export default function Section6({ onComplete }: Section6Props) {
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [displayedHeader, setDisplayedHeader] = useState('');
  const [displayedSubheader, setDisplayedSubheader] = useState('');
  const [headerIndex, setHeaderIndex] = useState(0);
  const [subheaderIndex, setSubheaderIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const headerText = "Websites are more human than most people might think.";
  const introText = "At the end of the day, our end goal is to communicate and express an idea in digitized form. The deliberate choices in how the content is laid out, which fonts to use, and how the interactions should be ordered show that the line between coder and artist is blurrier than we imagine.";

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

  // Show continue button after all text is complete
  useEffect(() => {
    if (subheaderIndex >= introText.length) {
      setTimeout(() => setShowContinueButton(true), 2000);
    }
  }, [subheaderIndex, introText]);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const sectionElement = document.getElementById('section6');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);



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

  // Generate transition circles for space effect
  const transitionCircles = useMemo(() => {
    const circles = [];
    for (let i = 0; i < 40; i++) {
      circles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 200,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 2
      });
    }
    return circles;
  }, []);



  return (
    <div id="section6" className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Transition to Section 7 Overlay */}
      {isTransitioning && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* Background that fades in */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-gray-900"></div>
          
          {/* Moving Circles Effect */}
          {transitionCircles.map((circle) => (
            <motion.div
              key={circle.id}
              className="absolute bg-white rounded-full opacity-20"
              style={{
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                width: `${circle.size}px`,
                height: `${circle.size}px`
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [0, 0.2, 0]
              }}
              transition={{
                duration: 2.5,
                delay: circle.delay,
                ease: "easeOut",
                repeat: 0
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Background stars - fading out as we approach earth */}
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

      {/* Earth atmosphere glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 via-transparent to-transparent" />

      {/* Skip button */}
      <div className="absolute top-8 right-8 z-10">
        <button
          onClick={onComplete}
          className="text-gray-300 hover:text-white text-sm font-light transition-colors duration-200 underline underline-offset-2"
        >
          Skip
        </button>
      </div>
      
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
            <h1 className="text-4xl md:text-6xl font-bold text-white font-lexend leading-tight px-4">
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
            <p className="text-lg md:text-2xl leading-relaxed text-blue-100 max-w-4xl mx-auto px-4">
              {displayedSubheader}
              {subheaderIndex < introText.length && <span className="animate-pulse text-white">|</span>}
            </p>
          </motion.div>



          {/* Earth image with continue button overlay */}
          <motion.div 
            className="w-full h-screen relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.2, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 3, duration: 2, ease: "easeOut" }}
          >
            <img 
              src="/earth.png" 
              alt="Earth" 
              className="w-full h-auto object-cover"
            />
            
                        {/* Continue button positioned on earth */}
            {showContinueButton && (
              <motion.div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className="bg-white text-black px-12 py-6 rounded-full text-xl font-light transition-all duration-500 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      window.scrollTo(0, 0);
                      onComplete();
                    }, 2000);
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Continue
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
