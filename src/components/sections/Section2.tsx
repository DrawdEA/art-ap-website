'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section2Props {
  onComplete: () => void;
  addBlogElement: (type: string, content: any) => void;
  blogElements: any;
}

export default function Section2({ onComplete, addBlogElement, blogElements }: Section2Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showBlog, setShowBlog] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const titleText = "HTML.";
  const introText = "Usually the first exposure people get to coding. It is the backbone of the internet. It's simple. It's straightforward. It's logical. It is the backbone of every website on the web.";
   
  const [titleDisplayed, setTitleDisplayed] = useState(false);
  const [titleTextIndex, setTitleTextIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');

  const steps = [
    { text: "You add a title, done.", delay: 1500, action: () => addBlogElement('title', 'My First Blog') },
    { text: "You add a paragraph, done.", delay: 1500, action: () => addBlogElement('paragraphs', 'This is my first paragraph. Welcome to my blog!') },
    { text: "You group them together using a div, easy.", delay: 1500, action: () => addBlogElement('divs', 'blog-post') },
    { text: "You create multiple duplicates of those things, and you've got yourself a blog website.", delay: 2500, action: () => {
      // Add multiple blog post divs to show duplication
      addBlogElement('divs', 'blog-post');
      addBlogElement('divs', 'blog-post');
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

        {/* Live HTML preview - shows content being built */}
        {showPreview && (
          <motion.div
            className="bg-white border border-gray-300 min-h-96"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
            
            {/* Raw HTML content - unstyled like a real browser */}
            <div className="p-6 font-sans text-black">
              {/* Title at the top */}
              {blogElements.title && (
                <motion.h1 
                  className="text-2xl font-bold mb-4 text-black"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  You add a title, done.
                </motion.h1>
              )}

              {/* Paragraph below title */}
              {blogElements.paragraphs.map((paragraph: string, index: number) => (
                <motion.p 
                  key={index}
                  className="text-black mb-4 leading-relaxed"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  You add a paragraph, done.
                </motion.p>
              ))}

              {/* Divs below paragraph - containing the content */}
              {blogElements.divs.map((div: string, index: number) => (
                <motion.div 
                  key={index}
                  className="border border-gray-400 p-4 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <h2 className="text-xl font-bold mb-2 text-black">You group them together using a div, easy.</h2>
                  <p className="text-black text-sm text-gray-600">You create multiple duplicates of those things, and you've got yourself a blog website.</p>
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
              Continue to CSS
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
