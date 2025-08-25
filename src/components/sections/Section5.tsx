'use client';

import { motion } from 'framer-motion';

interface Section5Props {
  onComplete: () => void;
}

export default function Section5({ onComplete }: Section5Props) {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white p-8 flex flex-col justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Skip button */}
      <div className="absolute top-8 right-8 z-10">
        <motion.button
          onClick={onComplete}
          className="text-gray-400 hover:text-white text-sm font-light transition-all duration-300 px-4 py-2 rounded-full border border-gray-600 hover:border-white hover:bg-white/10 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip
        </motion.button>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main heading with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-7xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 font-display leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          >
            Suddenly, coding doesn't seem too far away from what people consider art.
          </motion.h1>
        </motion.div>
        
        {/* Subtitle with elegant animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
        >
          <motion.p 
            className="text-2xl leading-relaxed mb-12 text-gray-200 font-light max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
          >
            In fact, it has always been a form of art. People mimic what they see and turn it into one. 
            These websites are a model testament to this.
          </motion.p>
        </motion.div>

        {/* Facebook example card with enhanced styling */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 1.2, ease: "easeOut" }}
        >
          <div className="bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-purple-900/80 p-10 rounded-2xl border border-blue-400/30 backdrop-blur-sm shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full opacity-60"></div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            
            <motion.h2 
              className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              Facebook, for instance
            </motion.h2>
            
            <motion.p 
              className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.3, duration: 0.8 }}
            >
              is essentially a microcosm of our society in online form. You meet people, 
              create discussions, and share your opinion.
            </motion.p>
          </div>
        </motion.div>

        {/* Continue button with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1, ease: "easeOut" }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-12 py-6 rounded-full text-2xl font-medium transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 border border-blue-400/30 backdrop-blur-sm"
            onClick={onComplete}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 4.2, duration: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Continue
          </motion.button>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
