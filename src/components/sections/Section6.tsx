'use client';

import { motion } from 'framer-motion';

interface Section6Props {
  onComplete: () => void;
}

export default function Section6({ onComplete }: Section6Props) {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8 flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="mb-12"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">👤</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl font-bold mb-8 text-white font-serif"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Websites are more human than most people might think.
        </motion.h1>
        
        <motion.p 
          className="text-2xl leading-relaxed mb-8 text-indigo-200"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          At the end of the day, our end goal is to communicate and express an idea in digitized form. 
          The deliberate choices in how the content is laid out, which fonts to use, and how the 
          interactions should be ordered show that the line between coder and artist is blurrier than we imagine.
        </motion.p>

                 <motion.button
           className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-none text-xl font-light transition-all duration-300"
           onClick={onComplete}
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 2.5, duration: 0.5 }}
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
         >
           Continue to Conclusion
         </motion.button>
      </div>
    </motion.div>
  );
}
