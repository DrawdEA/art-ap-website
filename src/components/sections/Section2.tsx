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

  const steps = [
    { text: "HTML. Usually the first exposure people get to coding. It is the backbone of the internet. It's simple. It's straightforward. It's logical. It is the backbone of every website on the web.", delay: 0 },
    { text: "You add a title, done.", delay: 2000, action: () => addBlogElement('title', 'My First Blog') },
    { text: "You add a paragraph, done.", delay: 4000, action: () => addBlogElement('paragraphs', 'This is my first paragraph. Welcome to my blog!') },
    { text: "You group them together using a div, easy.", delay: 6000, action: () => addBlogElement('divs', 'content-wrapper') },
    { text: "You create multiple duplicates of those things, and you've got yourself a blog website.", delay: 8000, action: () => setShowBlog(true) }
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

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Left side - Text content */}
        <div className="w-1/2 float-left pr-8">
          <motion.h1 
            className="text-5xl font-bold mb-8 text-gray-800 font-sans"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            HTML
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
               Continue to CSS
             </motion.button>
          )}
        </div>

        {/* Right side - Live blog creation */}
        <div className="w-1/2 float-right">
          <div className="bg-gray-100 p-6 rounded-lg min-h-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Live Blog Creation</h3>
            
            {blogElements.title && (
              <motion.h1 
                className="text-3xl font-bold mb-4 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {blogElements.title}
              </motion.h1>
            )}

            {blogElements.paragraphs.map((paragraph: string, index: number) => (
              <motion.p 
                key={index}
                className="text-gray-600 mb-4 leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {paragraph}
              </motion.p>
            ))}

            {blogElements.divs.map((div: string, index: number) => (
              <motion.div 
                key={index}
                className="border-2 border-dashed border-gray-400 p-4 mb-4 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <span className="text-gray-500 text-sm">div: {div}</span>
              </motion.div>
            ))}

            {showBlog && (
              <motion.div
                className="bg-blue-100 p-4 rounded border-l-4 border-blue-500"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-blue-800 font-semibold">🎉 Blog website created!</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
