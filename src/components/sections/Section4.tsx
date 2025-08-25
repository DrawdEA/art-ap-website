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

  const titleText = "JavaScript.";
  const introText = "The third backbone of the internet is JavaScript. Yes, a programming language. 99% of all websites use this language as the one that handles all its logic. It might not be obvious at first glance, but for every button you click and every animation you see, JavaScript is most likely the one behind the mechanism. It turns a plain, static website into a beautiful and interactive experience.";
  
  const [titleDisplayed, setTitleDisplayed] = useState(false);
  const [titleTextIndex, setTitleTextIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');

  const steps = [
    { 
      text: "Let's add some interactivity to our blog!", 
      delay: 2000, 
      action: () => setShowBlog(true)
    }
  ];

  // Typewriter effect for title and intro text
  useEffect(() => {
    if (!titleDisplayed) {
      // Start title typewriter after 500ms
      setTimeout(() => setTitleDisplayed(true), 500);
    } else if (titleTextIndex < titleText.length) {
      // Type out title first
      const timer = setTimeout(() => {
        setDisplayedTitle(prev => prev + titleText[titleTextIndex]);
        setTitleTextIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    } else if (currentIndex < introText.length) {
      // After title is complete, type out intro text
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + introText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);

      return () => clearTimeout(timer);
    } else {
      // Show preview after intro text is complete
      setTimeout(() => setShowPreview(true), 1000);
    }
  }, [titleDisplayed, titleTextIndex, titleText, currentIndex, introText]);

  // Handle steps after preview is shown
  useEffect(() => {
    if (showPreview && currentStep < steps.length) {
      const timer = setTimeout(() => {
        const currentStepData = steps[currentStep];
        if (currentStepData && currentStepData.action) {
          currentStepData.action();
        }
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [showPreview, currentStep, steps]);

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
            <div className="p-6" style={{
              backgroundColor: '#1f2937',
              transition: 'all 0.4s ease-in-out'
            }}>
              {/* Title */}
              <h1 
                className="text-3xl font-bold mb-4 text-gray-800"
                style={{
                  fontFamily: 'Rubik Distressed, cursive',
                  color: '#f9fafb',
                  fontWeight: 'normal',
                  letterSpacing: 'normal'
                }}
              >
                You add a title, done.
              </h1>
              
              {/* Paragraph */}
              <p 
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
              >
                You add a paragraph, done.
              </p>
              
              {/* Divs with all styling applied */}
              {[0, 1, 2].map((index) => (
                <div 
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
                >
                  {/* Profile images */}
                  <div className="absolute top-1/2 right-6 w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm overflow-hidden transform -translate-y-1/2">
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
                  </div>
                  <h2 className="text-xl mb-2" 
                      style={{ 
                        color: '#f9fafb',
                        fontFamily: 'Rubik Distressed, cursive',
                        fontWeight: 'normal'
                      }}>
                    You group them together using a div, easy.
                  </h2>
                  <p className="text-sm" 
                     style={{ 
                       color: '#d1d5db',
                       fontFamily: 'Rubik Distressed, cursive'
                     }}>
                    You create multiple duplicates of those things, and you&apos;ve got yourself a blog website.
                  </p>
                </div>
              ))}

              {/* Interactive JavaScript elements */}
              {showBlog && (
                <div className="mt-6 space-y-4">
                  <motion.button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                    onClick={() => addBlogElement('buttons', 'interactive-button')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Click Me! 🎯
                  </motion.button>
                  
                  <motion.div
                    className="w-full h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg flex items-center justify-center text-white font-semibold"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, -1, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨ Animated Element ✨
                  </motion.div>
                  
                  <div className="text-center text-green-400 font-semibold">
                    🎉 JavaScript is working! Everything is now animated!
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Continue button */}
        {showBlog && (
          <motion.div className="text-center mt-8">
            <motion.button
              className="bg-transparent hover:bg-gray-100 text-black px-8 py-4 rounded-none text-xl font-light transition-all duration-300"
              onClick={onComplete}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
