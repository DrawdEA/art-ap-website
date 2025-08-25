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
  const [showButton, setShowButton] = useState(false);
  const [showAnimations, setShowAnimations] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { 
      text: "The third backbone of the internet is JavaScript. Yes, a programming language. 99% of all websites use this language as the one that handles all its logic.", 
      delay: 0 
    },
    { 
      text: "It might not be obvious at first glance, but for every button", 
      delay: 3000, 
      action: () => setShowButton(true)
    },
    { 
      text: "you click and every animation", 
      delay: 6000, 
      action: () => setShowAnimations(true)
    },
    { 
      text: "you see, JavaScript is most likely the one behind the mechanism. It turns a plain, static website into a beautiful and interactive experience.", 
      delay: 9000, 
      action: () => setIsAnimating(true)
    }
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        if (steps[currentStep].action) {
          steps[currentStep].action();
        }
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleButtonClick = () => {
    addBlogElement('buttons', 'interactive-button');
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Skip button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={onComplete}
          className="text-gray-400 hover:text-gray-600 text-sm font-light transition-colors duration-200 underline underline-offset-2"
        >
          Skip
        </button>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Left side - Text content */}
        <div className="w-1/2 float-left pr-8">
          <motion.h1 
            className="text-5xl font-bold mb-8 text-yellow-600 font-sans"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            JavaScript
          </motion.h1>
          
          <motion.p 
            className="text-xl leading-relaxed mb-8 text-gray-600"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {steps[currentStep]?.text || steps[steps.length - 1].text}
          </motion.p>

          {currentStep >= steps.length && (
                         <motion.button
               className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-none text-xl font-light transition-all duration-300"
               onClick={onComplete}
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
             >
               Continue
             </motion.button>
          )}
        </div>

        {/* Right side - Interactive blog preview */}
        <div className="w-1/2 float-right">
          <div className="bg-gray-100 p-6 rounded-lg min-h-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Interactive Blog Preview</h3>
            
            {blogElements.title && (
              <motion.h1 
                className="text-3xl font-bold mb-4 text-gray-800"
                animate={isAnimating ? {
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {blogElements.title}
              </motion.h1>
            )}

            {blogElements.paragraphs.map((paragraph: string, index: number) => (
              <motion.p 
                key={index}
                className="text-gray-600 mb-4 leading-relaxed"
                animate={isAnimating ? {
                  y: [0, -5, 0],
                  opacity: [1, 0.8, 1]
                } : {}}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {paragraph}
              </motion.p>
            ))}

            {blogElements.divs.map((div: string, index: number) => (
              <motion.div 
                key={index}
                className="border-2 border-dashed border-gray-400 p-4 mb-4 rounded"
                animate={isAnimating ? {
                  backgroundColor: ['#f3f4f6', '#e5e7eb', '#f3f4f6'],
                  borderColor: ['#d1d5db', '#9ca3af', '#d1d5db']
                } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                <span className="text-gray-500 text-sm">div: {div}</span>
              </motion.div>
            ))}

            {showButton && (
                             <motion.button
                 className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-none font-light mb-4"
                 onClick={handleButtonClick}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
               >
                 Click Me! 🎯
               </motion.button>
            )}

            {showAnimations && (
              <motion.div
                className="w-full h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg flex items-center justify-center text-white font-semibold mb-4"
                animate={isAnimating ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                  borderRadius: ['8px', '20px', '8px']
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨ Animated Element ✨
              </motion.div>
            )}

            {isAnimating && (
              <motion.div
                className="text-center text-green-600 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                🎉 JavaScript is working! Everything is now animated!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
