'use client';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
         <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
       <div className="text-center">
         <button
           className="bg-black hover:bg-gray-800 text-white px-12 py-6 rounded-none text-2xl font-light transition-colors duration-300"
           onClick={onStart}
         >
           Start Experience
         </button>
       </div>
     </div>
  );
}
