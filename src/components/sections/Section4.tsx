'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section4Props {
  onComplete: () => void;
  addBlogElement: (type: string, content: any) => void;
  blogElements: any;
}

export default function Section4({ onComplete, addBlogElement, blogElements }: Section4Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBlog, setShowBlog] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const titleText = "JavaScript.";
  const introText = "The third backbone of the internet is JavaScript. Yes, a programming language. 99% of all websites use this language as the one that handles all its logic. It might not be obvious at first glance, but for every button you click and every animation you see, JavaScript is most likely the one behind the mechanism. It turns a plain, static website into a beautiful and interactive experience.";

  // Helper function to get typing delay based on the previous character
  const getTypingDelay = (prevChar: string) => {
    if (prevChar === '.' || prevChar === '!') return 800; // Longer pause after sentence endings
    if (prevChar === ',') return 400; // Medium pause after commas
    return 30; // Normal typing speed
  };
  
  const [titleDisplayed, setTitleDisplayed] = useState(false);
  const [titleTextIndex, setTitleTextIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleComplete, setTitleComplete] = useState(false);
  const [titleDelayComplete, setTitleDelayComplete] = useState(false);

  const steps = [
    { 
      text: "Let's add some interactivity to our blog! Click the button to see JavaScript in action.", 
      delay: 2000, 
      action: () => setShowBlog(true)
    }
  ];

  const [showChatBubble, setShowChatBubble] = useState(false);
  const [currentChatText, setCurrentChatText] = useState('');

  const handleButtonClick = () => {
    setIsAnimating(true);
    addBlogElement('buttons', 'interactive-button');
    
    // Show continue button after 3 seconds of animations
    setTimeout(() => {
      setShowContinueButton(true);
    }, 3000);
  };

  const handleContinue = () => {
    setIsTransitioning(true);
    // Wait for space transition to complete before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  // Generate random circles for space effect
  const generateCircles = () => {
    const circles = [];
    for (let i = 0; i < 15; i++) {
      circles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4, // Smaller stars: 4-12px
        delay: Math.random() * 1.5
      });
    }
    return circles;
  };

  const circles = generateCircles();

  // Typewriter effect for title and intro text
  useEffect(() => {
    if (!titleDisplayed) {
      // Start title typewriter after 500ms
      setTimeout(() => setTitleDisplayed(true), 500);
    } else if (titleTextIndex < titleText.length) {
      // Type out title first
      const currentChar = titleText[titleTextIndex];
      const prevChar = titleTextIndex > 0 ? titleText[titleTextIndex - 1] : '';
      const delay = getTypingDelay(prevChar);
      
      const timer = setTimeout(() => {
        setDisplayedTitle(prev => prev + currentChar);
        setTitleTextIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!titleComplete) {
      // Add delay after title is complete before starting intro text
      setTitleComplete(true);
      // Start the delay timer
      setTimeout(() => setTitleDelayComplete(true), 1000);
    } else if (!titleDelayComplete) {
      // Wait for delay to complete
      return;
    } else if (currentIndex < introText.length) {
      // After title is complete and delay passed, type out intro text
      const currentChar = introText[currentIndex];
      const prevChar = currentIndex > 0 ? introText[currentIndex - 1] : '';
      const delay = getTypingDelay(prevChar);
      
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + currentChar);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // Show preview after intro text is complete
      setTimeout(() => setShowPreview(true), 1000);
    }
  }, [titleDisplayed, titleTextIndex, titleText, currentIndex, introText, titleComplete, titleDelayComplete]);

  // Handle steps after preview is shown
  useEffect(() => {
    if (showPreview && currentStep < steps.length) {
      const timer = setTimeout(() => {
        const currentStepData = steps[currentStep];
        if (currentStepData && currentStepData.action) {
          currentStepData.action();
        }
        
        // Show chat bubble for current step
        setCurrentChatText(currentStepData.text);
        setShowChatBubble(true);
        
        // Hide chat bubble after 2 seconds, giving 0.5s gap before next step
        setTimeout(() => setShowChatBubble(false), 2000);
        
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [showPreview, currentStep, steps]);

  return (
    <div className="min-h-screen bg-white p-8">
             {/* Space Transition Overlay */}
       {isTransitioning && (
         <motion.div 
           className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
           initial={{ y: "100%" }}
           animate={{ y: 0 }}
           transition={{ duration: 2, ease: "easeInOut" }}
         >
           {/* Black background that slides in from bottom */}
           <div className="absolute inset-0 bg-black"></div>
          
          {/* Moving Circles Effect */}
          {circles.map((circle) => (
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
                opacity: [0, 0.3, 0]
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

      {/* Skip button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={handleContinue}
          className="text-gray-400 hover:text-gray-600 text-sm font-light transition-colors duration-200 underline underline-offset-2"
        >
          Skip
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Typewriter intro text at the top */}
        <div className="text-center mb-12">
          {titleDisplayed && (
            <h1 className="text-5xl font-bold mb-8 text-gray-800 font-sans">
              {displayedTitle}
              {titleTextIndex < titleText.length && <span className="animate-pulse">|</span>}
            </h1>
          )}
        
          <div className="text-xl leading-relaxed text-gray-600 mb-8">
            {displayedText}
            {titleTextIndex >= titleText.length && currentIndex < introText.length && <span className="animate-pulse">|</span>}
          </div>
        </div>

        {/* Chat Bubble for Step Details */}
        {showChatBubble && (
          <motion.div 
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border-2 border-gray-300 rounded-lg shadow-2xl p-6 max-w-md">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">JavaScript Step</span>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed">{currentChatText}</p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-l-2 border-gray-300 rotate-45"></div>
            </div>
          </motion.div>
        )}

        {/* JavaScript Interactive Blog Preview */}
        {showPreview && (
          <motion.div 
            className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Browser-like header */}
            <div className="bg-gray-200 px-4 py-2 border-b border-gray-300 flex items-center">
              <div className="flex space-x-2 mr-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Edward Diesta&apos;s Website</span>
            </div>
            
            {/* Content area with the finished CSS blog */}
            <div className="p-6 relative" style={{
              backgroundColor: '#1f2937',
              transition: 'all 0.4s ease-in-out'
            }}>
               {/* Click Me button positioned in upper right */}
               {showBlog && (
                 <motion.button
                   className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-3 rounded-none font-medium transition-colors duration-300 border border-gray-500 z-10"
                   onClick={handleButtonClick}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   style={{
                     fontFamily: 'Rubik Distressed, cursive',
                     fontWeight: 'normal'
                   }}
                 >
                   Click Me!
                 </motion.button>
               )}

               {/* Title */}
               <motion.h1 
                 className="text-3xl font-bold mb-4 text-gray-800"
                 style={{
                   fontFamily: 'Rubik Distressed, cursive',
                   color: '#f9fafb',
                   fontWeight: 'normal',
                   letterSpacing: 'normal'
                 }}
                 animate={isAnimating ? {
                   scale: [1, 1.2, 0.8, 1.1, 1],
                   rotate: [0, 5, -5, 3, -3, 0],
                   x: [0, 10, -10, 5, -5, 0],
                   filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)']
                 } : {}}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                 You add a title, done.
               </motion.h1>
               
               {/* Paragraph */}
               <motion.p 
                 className="text-gray-600 mb-4 leading-relaxed"
                 style={{
                   color: '#e5e7eb',
                   fontFamily: 'Rubik Distressed, cursive',
                   border: 'none',
                   padding: '0',
                   borderRadius: '0',
                   backgroundColor: 'transparent',
                   transition: 'all 0.4s ease-in-out'
                 }}
                 animate={isAnimating ? {
                   y: [0, -15, 15, -8, 8, 0],
                   opacity: [1, 0.3, 0.8, 0.5, 0.9, 1],
                   scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
                   skewX: [0, 5, -5, 3, -3, 0]
                 } : {}}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               >
                 You add a paragraph, done.
               </motion.p>
               
               {/* Divs with all styling applied */}
               {[0, 1, 2].map((index) => (
                 <motion.div 
                   key={index}
                   className="border border-gray-300 p-4 mb-4 relative"
                   style={{
                     backgroundColor: '#374151',
                     color: '#f3f4f6',
                     border: '2px solid #6b7280',
                     borderRadius: '0',
                     background: '#374151',
                     transition: 'all 0.4s ease-in-out'
                   }}
                   animate={isAnimating ? {
                     backgroundColor: ['#374151', '#4b5563', '#6b7280', '#4b5563', '#374151'],
                     borderColor: ['#6b7280', '#9ca3af', '#d1d5db', '#9ca3af', '#6b7280'],
                     scale: [1, 1.05, 0.95, 1.02, 1],
                     rotateY: [0, 15, -15, 10, -10, 0],
                     y: [0, -5, 5, -3, 3, 0]
                   } : {}}
                   transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
                 >
                  {/* Profile images */}
                  <motion.div 
                    className="absolute top-1/2 right-6 w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm overflow-hidden transform -translate-y-1/2"
                    animate={isAnimating ? {
                      scale: [1, 1.3, 0.7, 1.2, 1],
                      rotate: [0, 180, 360, 180, 0],
                      y: [0, -10, 10, -5, 0]
                    } : {}}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.7, ease: "easeInOut" }}
                  >
                    <img 
                      src={`https://i.pravatar.cc/48?img=${index + 1}`} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <span style={{ display: 'none' }}>👤</span>
                  </motion.div>
                  <motion.h2 
                    className="text-xl mb-2" 
                    style={{ 
                      color: '#f9fafb',
                      fontFamily: 'Rubik Distressed, cursive',
                      fontWeight: 'normal'
                    }}
                    animate={isAnimating ? {
                      scale: [1, 1.15, 0.9, 1.1, 1],
                      x: [0, 8, -8, 4, -4, 0],
                      color: ['#f9fafb', '#60a5fa', '#f9fafb', '#a78bfa', '#f9fafb']
                    } : {}}
                    transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  >
                    You group them together using a div, easy.
                  </motion.h2>
                  <motion.p 
                    className="text-sm" 
                    style={{ 
                      color: '#d1d5db',
                      fontFamily: 'Rubik Distressed, cursive'
                    }}
                    animate={isAnimating ? {
                      y: [0, -8, 8, -4, 4, 0],
                      opacity: [1, 0.6, 0.9, 0.4, 0.8, 1],
                      scale: [1, 1.08, 0.92, 1.04, 0.96, 1]
                    } : {}}
                    transition={{ duration: 4.5, repeat: Infinity, delay: index * 0.6, ease: "easeInOut" }}
                  >
                    You create multiple duplicates of those things, and you&apos;ve got yourself a blog website.
                  </motion.p>
                 </motion.div>
               ))}

              
            </div>
          </motion.div>
        )}

        {/* Continue button */}
        {showContinueButton && (
          <motion.div className="text-center mt-8">
            <motion.button
              className="bg-transparent hover:bg-gray-100 text-black px-8 py-4 rounded-none text-xl font-light transition-all duration-300"
              onClick={handleContinue}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
