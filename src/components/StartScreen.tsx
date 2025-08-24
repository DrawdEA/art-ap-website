'use client';

import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div 
      className="min-h-screen bg-black text-white flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.h1 
          className="text-6xl font-bold mb-8 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          The Art of Web Development
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          An interactive journey through HTML, CSS, and JavaScript, 
          demonstrating how web development transcends mere coding 
          to become a form of artistic expression.
        </motion.p>

        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-lg text-2xl font-semibold transition-all duration-300 transform hover:scale-105"
          onClick={onStart}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Experience
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
