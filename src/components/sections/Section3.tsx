'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section3Props {
  onComplete: () => void;
  addBlogElement: (type: string, content: any) => void;
  blogElements: any;
}

export default function Section3({ onComplete, addBlogElement, blogElements }: Section3Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showBlog, setShowBlog] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [appliedStyles, setAppliedStyles] = useState<any>({});

  const titleText = "CSS.";
  const introText = "Okay, cool. We got the content down. Now what? We style it. The second backbone of the internet is CSS. It is what allows us to color and style our structured content to make it prettier. Think of it as the coder's paintbrush. With this, we can now let our creative freedom roam and add as much styling as we wish.";

  // Helper function to get typing delay based on the previous character
  const getTypingDelay = (prevChar: string) => {
    if (prevChar === '.' || prevChar === '!' || prevChar === '?') return 800; // Longer pause after sentence endings
    if (prevChar === ',') return 400; // Medium pause after commas
    return 30; // Normal typing speed
  };
  
  const [titleDisplayed, setTitleDisplayed] = useState(false);
  const [titleTextIndex, setTitleTextIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleComplete, setTitleComplete] = useState(false);
  const [titleDelayComplete, setTitleDelayComplete] = useState(false);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [currentChatText, setCurrentChatText] = useState('');

  const steps = [
    { text: "We can color the paragraph blue,", delay: 2500, action: () => setAppliedStyles(prev => ({ ...prev, paragraphColor: 'blue' })) },
    { text: "or change all elements to black.", delay: 2500, action: () => setAppliedStyles(prev => ({ ...prev, color: 'black' })) },
    { text: "We can also change their fonts to make it much prettier.", delay: 2500, action: () => setAppliedStyles(prev => ({ ...prev, font: 'minimalist' })) },
    { text: "We can also add designed borders,", delay: 2500, action: () => setAppliedStyles(prev => ({ ...prev, border: true })) },
    { text: "and add our own images to make it personalized.", delay: 2500, action: () => {
      setAppliedStyles(prev => ({ ...prev, image: true }));
      setShowBlog(true);
    }}
  ];

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

         

         {/* Chat Bubble for Step Details */}
         {showChatBubble && (
           <motion.div 
             className={`fixed z-50 ${
               currentStep === 1 ? 'top-1/3 left-1/2 transform -translate-x-1/2' : // Blue paragraph - position near paragraph
               currentStep === 2 ? 'top-1/4 left-1/2 transform -translate-x-1/2' : // Dark mode - general change, keep at top
               currentStep === 3 ? 'top-1/4 left-1/2 transform -translate-x-1/2' : // Fonts - general change, keep at top
               currentStep === 4 ? 'top-1/4 left-1/2 transform -translate-x-1/2' : // Borders - general change, keep at top
               'top-1/4 left-1/2 transform -translate-x-1/2' // Default position
             }`}
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: 20 }}
             transition={{ duration: 0.3 }}
           >
             <div className="bg-white border-2 border-gray-300 rounded-lg shadow-2xl p-6 max-w-md">
               <div className="flex items-center mb-3">
                 <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                 <span className="text-sm font-medium text-gray-600">CSS Step</span>
               </div>
               <p className="text-gray-800 text-lg leading-relaxed">{currentChatText}</p>
               <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-l-2 border-gray-300 rotate-45"></div>
             </div>
           </motion.div>
         )}

         {/* CSS Styled Blog Preview */}
                   {showPreview && (
            <motion.div 
              className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg w-full"
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
             
                                                       <div className="p-4 md:p-6 overflow-x-auto" style={{
                              backgroundColor: appliedStyles.color === 'black' ? '#1f2937' : 'white',
                              transition: 'all 0.4s ease-in-out'
                            }}>
                                 <motion.h1 
                  className="text-xl md:text-3xl font-bold mb-4 text-gray-800"
                  style={{
                    fontFamily: appliedStyles.font === 'minimalist' ? 'Rubik Distressed, cursive' : 'var(--font-sans), system-ui, sans-serif',
                    color: appliedStyles.color === 'black' ? '#f9fafb' : '#1f2937',
                    fontWeight: appliedStyles.font === 'minimalist' ? 'normal' : '700',
                    letterSpacing: 'normal'
                  }}
                >
                  You add a title, done.
                </motion.h1>

                <motion.p 
                  className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base"
                  style={{
                    color: appliedStyles.paragraphColor === 'blue' && !appliedStyles.color ? '#3b82f6' : 
                           appliedStyles.color === 'black' ? '#e5e7eb' : '#6b7280',
                    fontFamily: appliedStyles.font === 'minimalist' ? 'Rubik Distressed, cursive' : 'var(--font-sans), system-ui, sans-serif',
                    border: 'none', // Paragraph has no borders
                    padding: '0',
                    borderRadius: '0',
                    backgroundColor: appliedStyles.paragraphColor === 'blue' && !appliedStyles.color ? '#dbeafe' : 'transparent',
                    transition: 'all 0.4s ease-in-out'
                  }}
                >
                  You add a paragraph, done.
                </motion.p>

                               {[0, 1, 2].map((index) => (
                  <motion.div 
                    key={index}
                    className="border border-gray-300 p-3 md:p-4 mb-4 relative"
                    style={{
                      backgroundColor: appliedStyles.color === 'black' ? '#374151' : 'transparent',
                      color: appliedStyles.color === 'black' ? '#f3f4f6' : 'inherit',
                      border: appliedStyles.border ? '2px solid #6b7280' : 
                             appliedStyles.color === 'black' ? 'none' : '1px solid #9ca3af',
                      borderRadius: '0',
                      background: appliedStyles.color === 'black' ? '#374151' : 'transparent',
                      transition: 'all 0.4s ease-in-out'
                    }}
                  >
                                                           {/* Placeholder people images - responsive positioning */}
                    {appliedStyles.image && (
                      <div className="absolute top-2 md:top-1/2 right-2 md:right-6 w-8 h-8 md:w-12 md:h-12 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm overflow-hidden transform md:-translate-y-1/2">
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
                    )}
                    <h2 className="text-lg md:text-xl mb-2 pr-12 md:pr-16" 
                        style={{ 
                          color: appliedStyles.color === 'black' ? '#f9fafb' : '#1f2937',
                          fontFamily: appliedStyles.font === 'minimalist' ? 'Rubik Distressed, cursive' : 'var(--font-sans), system-ui, sans-serif',
                          fontWeight: appliedStyles.font === 'minimalist' ? 'normal' : '700'
                        }}>
                      You group them together using a div, easy.
                    </h2>
                   <p className="text-xs md:text-sm" 
                      style={{ 
                        color: appliedStyles.color === 'black' ? '#d1d5db' : '#6b7280',
                        fontFamily: appliedStyles.font === 'minimalist' ? 'Rubik Distressed, cursive' : 'var(--font-sans), system-ui, sans-serif'
                      }}>
                     You create multiple duplicates of those things, and you&apos;ve got yourself a blog website.
                   </p>
                 </motion.div>
               ))}


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
