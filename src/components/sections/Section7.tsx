'use client';

import { motion } from 'framer-motion';

interface Section7Props {
  blogElements: any;
}

export default function Section7({ blogElements }: Section7Props) {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-900 to-teal-900 text-white p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Restart button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={() => window.location.reload()}
          className="text-gray-300 hover:text-white text-sm font-light transition-colors duration-200 underline underline-offset-2"
        >
          Restart
        </button>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Final message */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 font-display">Art is everywhere.</h1>
          <p className="text-xl text-green-200 leading-relaxed">
            Needless to say, with how fast the technology is improving, websites are also everywhere. 
            Moving forward, I'd like to see how people will open up to the discussion of whether or not 
            to consider a website an art form, similar to how they do with sculptures, literature, film, 
            among many others. After all, I have always considered it as so.
          </p>
        </motion.div>

        {/* Final blog showcase */}
        <motion.div 
          className="bg-white text-gray-800 p-8 rounded-lg mb-12 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Created Blog</h2>
          
          {blogElements.title && (
            <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
              {blogElements.title}
            </h1>
          )}

          {blogElements.paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className="text-lg text-gray-600 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {blogElements.divs.map((div: string, index: number) => (
            <div key={index} className="border-2 border-dashed border-gray-400 p-4 mb-4 rounded bg-gray-50">
              <span className="text-gray-500 text-sm">div: {div}</span>
            </div>
          ))}

          {blogElements.images.length > 0 && (
            <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold mb-4">
              🖼️ Sample Image
            </div>
          )}

          {blogElements.buttons.length > 0 && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
              Interactive Button
            </button>
          )}
        </motion.div>

        {/* Signature and GitHub */}
        <motion.div 
          className="text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="mb-8">
            <motion.div
              className="w-64 h-1 bg-white mx-auto mb-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            />
            <motion.h2 
              className="text-3xl font-bold mb-2 font-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              Diesta, Edward Joshua M.
            </motion.h2>
            <motion.p 
              className="text-xl text-green-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.5 }}
            >
              Web Developer & Artist
            </motion.p>
            <motion.div
              className="w-64 h-1 bg-white mx-auto mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3.5, duration: 1 }}
            />
          </div>

                     <motion.a
             href="https://github.com/DrawdEA/art-ap-website"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-none text-xl font-light transition-all duration-300 mr-4"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 4, duration: 0.5 }}
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
           >
             <span className="mr-2">📁</span>
             View the Blueprint on GitHub
           </motion.a>

           <motion.button
             onClick={() => window.location.reload()}
             className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-none text-xl font-light transition-all duration-300"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 4.5, duration: 0.5 }}
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
           >
             <span className="mr-2">🔄</span>
             Continue
           </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
