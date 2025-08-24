'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StartScreen from './StartScreen';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';

export default function BlogCreationExperience() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [blogElements, setBlogElements] = useState({
    title: '',
    paragraphs: [],
    divs: [],
    colors: [],
    fonts: [],
    borders: [],
    images: [],
    buttons: [],
    animations: []
  });

  const startExperience = () => {
    setHasStarted(true);
  };

  const progressToNextSection = () => {
    setCurrentSection(prev => Math.min(prev + 1, 7));
  };

  const addBlogElement = (type: string, content: string) => {
    setBlogElements(prev => ({
      ...prev,
      [type]: [...prev[type as keyof typeof prev], content]
    }));
  };

  if (!hasStarted) {
    return <StartScreen onStart={startExperience} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {currentSection === 1 && (
        <Section1 onComplete={progressToNextSection} />
      )}
      {currentSection === 2 && (
        <Section2 
          onComplete={progressToNextSection} 
          addBlogElement={addBlogElement}
          blogElements={blogElements}
        />
      )}
      {currentSection === 3 && (
        <Section3 
          onComplete={progressToNextSection} 
          addBlogElement={addBlogElement}
          blogElements={blogElements}
        />
      )}
      {currentSection === 4 && (
        <Section4 
          onComplete={progressToNextSection} 
          addBlogElement={addBlogElement}
          blogElements={blogElements}
        />
      )}
      {currentSection === 5 && (
        <Section5 onComplete={progressToNextSection} />
      )}
      {currentSection === 6 && (
        <Section6 onComplete={progressToNextSection} />
      )}
      {currentSection === 7 && (
        <Section7 blogElements={blogElements} />
      )}
    </div>
  );
}
