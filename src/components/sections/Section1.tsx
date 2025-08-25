'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section1Props {
  onComplete: () => void;
}

export default function Section1({ onComplete }: Section1Props) {
  const [showCommand, setShowCommand] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinalButton, setShowFinalButton] = useState(false);
  
  const paragraphs = [
    "Computer Science. Probably the farthest away from what people would think is \"artistic.\" Finding the most efficient algorithm, coding with the most logical framework, and solving LeetCode problems are some things that come to mind when people think of our course. These ideas don't seem like something you would interpret, nor consider as an interpretation. Nothing about these ideas sounds creative at all.",
    "Despite this, I find that in a specific field of this course that I am currently pursuing, there is one that seems to sway away from this trend. Web development. I find that it's just as much considered \"art\" as how people look at paintings, songs, and other traditional forms of art."
  ];

  useEffect(() => {
    // Show command after 1 second
    const commandTimer = setTimeout(() => setShowCommand(true), 1000);
    return () => clearTimeout(commandTimer);
  }, []);

  useEffect(() => {
    if (showCommand && currentParagraph < paragraphs.length && currentIndex < paragraphs[currentParagraph].length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + paragraphs[currentParagraph][currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);

      return () => clearTimeout(timer);
    } else if (currentIndex >= paragraphs[currentParagraph].length && currentParagraph < paragraphs.length - 1) {
      // Move to next paragraph automatically
      setTimeout(() => {
        setCurrentParagraph(prev => prev + 1);
        setCurrentIndex(0);
        setDisplayedText(prev => prev + '\n\n');
      }, 1000);
    } else if (currentIndex >= paragraphs[currentParagraph].length && currentParagraph >= paragraphs.length - 1) {
      // All paragraphs complete, show final button
      setTimeout(() => setShowFinalButton(true), 1000);
    }
  }, [currentIndex, currentParagraph, paragraphs, showCommand]);

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono">
      {/* Skip button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={onComplete}
          className="text-green-400 hover:text-green-300 text-sm font-light transition-colors duration-200 underline underline-offset-2"
        >
          Skip
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Terminal header */}
        <div className="flex items-center mb-6 text-sm text-gray-400">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span>terminal — bash</span>
        </div>
        
        {/* Command line */}
        {showCommand && (
          <div className="mb-4">
            <span className="text-green-400">$ </span>
            <span className="text-white">cat computer_science.txt</span>
          </div>
        )}
        
        {/* Content with typewriter effect */}
        <div className="text-lg leading-relaxed mb-8 whitespace-pre-wrap">
          {displayedText}
          <span className="animate-pulse">|</span>
        </div>
        
        {/* Final continue button */}
        {showFinalButton && (
          <motion.button
            className="bg-black hover:bg-gray-800 text-green-400 border border-green-400 px-8 py-4 rounded-none text-xl font-light transition-colors duration-300"
            onClick={onComplete}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
                         Continue
          </motion.button>
        )}
      </div>
    </div>
  );
}
