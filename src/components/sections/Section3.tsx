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
  const [appliedStyles, setAppliedStyles] = useState<any>({});

  const steps = [
    { 
      text: "Okay, cool. We got the content down. Now what? We style it. The second backbone of the internet is CSS. It is what allows us to color and style our structured content to make it prettier. Think of it as the coder's paintbrush.", 
      delay: 0 
    },
    { 
      text: "With this, we can now let our creative freedom roam and add as much styling as we wish.", 
      delay: 3000 
    },
    { 
      text: "We can color this division black", 
      delay: 6000, 
      action: () => setAppliedStyles(prev => ({ ...prev, color: 'black' }))
    },
    { 
      text: "the other orange", 
      delay: 8000, 
      action: () => setAppliedStyles(prev => ({ ...prev, color: 'orange' }))
    },
    { 
      text: "and so on, and so forth. We can change their fonts to make it much prettier", 
      delay: 10000, 
      action: () => setAppliedStyles(prev => ({ ...prev, font: 'serif' }))
    },
    { 
      text: "We can add borders", 
      delay: 13000, 
      action: () => setAppliedStyles(prev => ({ ...prev, border: true }))
    },
    { 
      text: "and add our own images to make it personalized.", 
      delay: 16000, 
      action: () => {
        addBlogElement('images', 'sample-image.jpg');
        setAppliedStyles(prev => ({ ...prev, image: true }));
      }
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

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Left side - Text content */}
        <div className="w-1/2 float-left pr-8">
          <motion.h1 
            className="text-5xl font-bold mb-8 text-purple-600"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            CSS
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
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-300"
              onClick={onComplete}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to JavaScript
            </motion.button>
          )}
        </div>

        {/* Right side - Styled blog preview */}
        <div className="w-1/2 float-right">
          <div className="bg-gray-100 p-6 rounded-lg min-h-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Styled Blog Preview</h3>
            
            {blogElements.title && (
              <motion.h1 
                className="text-3xl font-bold mb-4 text-gray-800"
                style={{
                  fontFamily: appliedStyles.font === 'serif' ? 'Georgia, serif' : 'inherit'
                }}
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
                style={{
                  color: appliedStyles.color || 'inherit',
                  fontFamily: appliedStyles.font === 'serif' ? 'Georgia, serif' : 'inherit',
                  border: appliedStyles.border ? '2px solid #e5e7eb' : 'none',
                  padding: appliedStyles.border ? '8px' : '0',
                  borderRadius: appliedStyles.border ? '4px' : '0'
                }}
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
                style={{
                  backgroundColor: appliedStyles.color === 'black' ? '#000' : 
                                 appliedStyles.color === 'orange' ? '#f97316' : 'transparent',
                  color: appliedStyles.color === 'black' ? '#fff' : 'inherit'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <span className="text-gray-500 text-sm">div: {div}</span>
              </motion.div>
            ))}

            {appliedStyles.image && (
              <motion.div
                className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                🖼️ Sample Image
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
