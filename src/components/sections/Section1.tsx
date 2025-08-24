'use client';

import { motion } from 'framer-motion';

interface Section1Props {
  onComplete: () => void;
}

export default function Section1({ onComplete }: Section1Props) {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          className="text-6xl font-bold mb-8 text-blue-400"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Computer Science
        </motion.h1>
        
        <motion.p 
          className="text-xl leading-relaxed mb-8 text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Probably the farthest away from what people would think is "artistic." 
          Finding the most efficient algorithm, coding with the most logical framework, 
          and solving LeetCode problems are some things that come to mind when people 
          think of our course. These ideas don't seem like something you would interpret, 
          nor consider as an interpretation. Nothing about these ideas sounds creative at all.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p className="text-xl leading-relaxed mb-12 text-gray-300">
            Despite this, I find that in a specific field of this course that I am 
            currently pursuing, there is one that seems to sway away from this trend. 
            <span className="text-blue-400 font-semibold"> Web development.</span> 
            I find that it's just as much considered "art" as how people look at 
            paintings, songs, and other traditional forms of art.
          </p>
        </motion.div>

        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-300 transform hover:scale-105"
          onClick={onComplete}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue to HTML
        </motion.button>
      </div>
    </motion.div>
  );
}
