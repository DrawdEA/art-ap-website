'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Section5Props {
  onComplete: () => void;
  addBlogElement: (type: string, content: string) => void;
  blogElements: Record<string, string | string[]>;
}

export default function Section5({ onComplete, addBlogElement, blogElements }: Section5Props) {
  const [displayedHeader, setDisplayedHeader] = useState('');
  const [displayedSubheader, setDisplayedSubheader] = useState('');
  const [headerIndex, setHeaderIndex] = useState(0);
  const [subheaderIndex, setSubheaderIndex] = useState(0);
  const [displayedFacebookTitle, setDisplayedFacebookTitle] = useState('');
  const [facebookTitleIndex, setFacebookTitleIndex] = useState(0);
  const [displayedFacebookText, setDisplayedFacebookText] = useState('');
  const [facebookTextIndex, setFacebookTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const headerText = "Suddenly, coding doesn't seem too far away from what people consider art.";
  const introText = "In fact, it has always been a form of art. People mimic what they see and turn it into one. These websites are a model testament to this.";
  const facebookTitle = "Facebook, for instance, is essentially a microcosm of our society in online form.";
  const facebookText = "You meet people, create discussions, and share your opinion.";

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



  // Typewriter effect for Facebook title (starts after subheader is complete)
  useEffect(() => {
    if (subheaderIndex >= introText.length && facebookTitleIndex < facebookTitle.length) {
      const currentChar = facebookTitle[facebookTitleIndex];
      const prevChar = facebookTitleIndex > 0 ? facebookTitle[facebookTitleIndex - 1] : '';
      const delay = getTypingDelay(prevChar);
      
      const timer = setTimeout(() => {
        setDisplayedFacebookTitle(prev => prev + currentChar);
        setFacebookTitleIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [subheaderIndex, introText, facebookTitleIndex, facebookTitle]);

  // Typewriter effect for Facebook text (starts after Facebook title is complete)
  useEffect(() => {
    if (facebookTitleIndex >= facebookTitle.length && facebookTextIndex < facebookText.length) {
      const currentChar = facebookText[facebookTextIndex];
      const prevChar = facebookTextIndex > 0 ? facebookText[facebookTextIndex - 1] : '';
      const delay = getTypingDelay(prevChar);
      
      const timer = setTimeout(() => {
        setDisplayedFacebookText(prev => prev + currentChar);
        setFacebookTextIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [facebookTitleIndex, facebookTitle, facebookTextIndex, facebookText]);

  // Generate planet positions for microcluster - use useMemo to keep positions stable
  const planets = useMemo(() => {
    const planetData = [];
    
    // Create a truly scattered cluster with forced separation
    const positions = [
      { x: 25, y: 30 }, { x: 75, y: 35 }, { x: 35, y: 60 }, { x: 65, y: 25 },
      { x: 45, y: 45 }, { x: 20, y: 50 }, { x: 80, y: 55 }, { x: 30, y: 40 },
      { x: 70, y: 70 }, { x: 40, y: 20 }, { x: 60, y: 40 }, { x: 50, y: 65 }
    ];
    
    for (let i = 0; i < 12; i++) {
      planetData.push({
        id: i,
        x: positions[i].x,
        y: positions[i].y,
        size: Math.random() * 12 + 8, // Smaller sizes (8-20px) like stars
        delay: Math.random() * 2
      });
    }
    return planetData;
  }, []);

  // Generate background stars - use useMemo to keep positions stable
  const backgroundStars = useMemo(() => {
    const starData = [];
    for (let i = 0; i < 80; i++) {
      starData.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 200,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 0.3 + 0.2,
        delay: Math.random() * 3
      });
    }
    return starData;
  }, []);

  // Generate transition circles - use useMemo to keep positions stable
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

    const sectionElement = document.getElementById('section5');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  return (
    <div id="section5" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundStars.map((star) => (
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
            <h1 className="text-6xl font-bold text-white font-lexend leading-tight">
              {displayedHeader}
              {headerIndex > 0 && headerIndex < headerText.length && <span className="animate-pulse text-white">|</span>}
            </h1>
          </motion.div>

          {/* Subheader */}
          <motion.div 
            className="text-center h-screen flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-2xl leading-relaxed text-white max-w-4xl mx-auto">
              {displayedSubheader}
              {subheaderIndex > 0 && subheaderIndex < introText.length && <span className="animate-pulse text-white">|</span>}
            </p>
          </motion.div>



          {/* Facebook section */}
          <motion.div 
            className="text-center h-screen flex flex-col justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <h2 className="text-4xl font-bold text-white font-lexend mb-6">
              {displayedFacebookTitle}
              {facebookTitleIndex < facebookTitle.length && <span className="animate-pulse text-white">|</span>}
            </h2>
            <p className="text-xl leading-relaxed text-white max-w-3xl mx-auto mb-8">
              {displayedFacebookText}
              {facebookTitleIndex >= facebookTitle.length && facebookTextIndex < facebookText.length && <span className="animate-pulse text-white">|</span>}
            </p>
            
            {/* Microcosm visual - always present but invisible until text completes */}
            <div className="relative w-full h-96 mb-8">
              {/* Connection lines between planets - always present */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {planets.slice(0, 6).map((planet, i) => 
                  planets.slice(i + 1, 7).map((otherPlanet, j) => (
                    <motion.line
                      key={`line-${i}-${j}`}
                      x1={`${planet.x}%`}
                      y1={`${planet.y}%`}
                      x2={`${otherPlanet.x}%`}
                      y2={`${otherPlanet.y}%`}
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1"
                      opacity="0.4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={facebookTextIndex >= facebookText.length ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
                      transition={{ duration: 2, delay: 1 + (i + j) * 0.1 }}
                    />
                  ))
                )}
              </svg>

              {/* Planets - always present but invisible */}
              {planets.map((planet, index) => (
                <motion.div
                  key={planet.id}
                  className="absolute rounded-full bg-white opacity-80"
                  style={{
                    left: `${planet.x}%`,
                    top: `${planet.y}%`,
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={facebookTextIndex >= facebookText.length ? { scale: 1, opacity: 0.8 } : { scale: 1, opacity: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1.5 + planet.delay, 
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.2, opacity: 1 }}
                />
              ))}

              {/* Central hub planet - always present but invisible */}
              <motion.div
                className="absolute left-1/2 top-1/2 w-16 h-16 bg-white rounded-full opacity-90"
                style={{ transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 1, opacity: 0 }}
                animate={facebookTextIndex >= facebookText.length ? { scale: 1, opacity: 0.9 } : { scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                whileHover={{ scale: 1.1, opacity: 1 }}
              />
            </div>

            {/* Continue button - only show after all text and planet animations are complete */}
            {facebookTextIndex >= facebookText.length && (
              <motion.button
                className="bg-transparent text-white mx-auto px-4 py-2 text-lg font-medium transition-all duration-300 hover:bg-white hover:text-black"
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                    onComplete();
                  }, 2000);
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Transition to Section 6 Overlay */}
      {isTransitioning && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* Background that fades in */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900 to-indigo-900"></div>
          
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
    </div>
  );
}
