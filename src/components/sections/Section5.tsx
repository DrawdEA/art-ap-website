'use client';

import { motion } from 'framer-motion';

interface Section5Props {
  onComplete: () => void;
}

export default function Section5({ onComplete }: Section5Props) {
  return (
    <motion.div 
      className="min-h-screen bg-black text-white p-8 flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-6xl font-bold mb-8 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Suddenly, coding doesn't seem too far away from what people consider art.
        </motion.h1>
        
        <motion.p 
          className="text-2xl leading-relaxed mb-8 text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          In fact, it has always been a form of art. People mimic what they see and turn it into one. 
          These websites are a model testament to this.
        </motion.p>

        <motion.div
          className="bg-blue-900 p-8 rounded-lg mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-200">Facebook, for instance</h2>
          <p className="text-xl text-blue-100">
            is essentially a microcosm of our society in online form. You meet people, 
            create discussions, and share your opinion.
          </p>
        </motion.div>

        <motion.button
          className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-300"
          onClick={onComplete}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue to Human Aspect
        </motion.button>
      </div>
    </motion.div>
  );
}
