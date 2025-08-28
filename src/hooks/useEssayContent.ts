import essayContent from '../data/essay-content.json';

export interface EssayContent {
  metadata: {
    title: string;
    subtitle: string;
    signature: string;
    author: string;
    roles: string;
    description: string;
  };
  sections: {
    section1: {
      title: string;
      paragraphs: string[];
      commandText: string;
      buttonText: string;
    };
    section2: {
      title: string;
      introText: string;
      steps: Array<{
        text: string;
        action: string;
      }>;
      buttonText: string;
    };
    section3: {
      title: string;
      introText: string;
      steps: Array<{
        text: string;
        action: string;
      }>;
      buttonText: string;
    };
    section4: {
      title: string;
      introText: string;
      steps: Array<{
        text: string;
        action: string;
      }>;
      buttonText: string;
    };
    section5: {
      title: string;
      headerText: string;
      introText: string;
      facebookTitle: string;
      facebookText: string;
      buttonText: string;
    };
    section6: {
      title: string;
      headerText: string;
      introText: string;
      buttonText: string;
    };
    section7: {
      title: string;
      headerText: string;
      introText: string;
      finalThought: string;
      essayDescription: string;
      portfolioLinks: {
        viewCode: string;
        portfolio: string;
        restart: string;
      };
      buttonText: string;
    };
  };
  ui: {
    buttons: {
      skip: string;
      continue: string;
      restart: string;
    };
    navigation: {
      next: string;
      previous: string;
    };
  };
  social: {
    github: string;
    portfolio: string;
    liveDemo: string;
  };
  typing: {
    delays: {
      period: number;
      comma: number;
      normal: number;
    };
    cursor: string;
  };
}

export const useEssayContent = () => {
  return essayContent as EssayContent;
};

// Helper functions for easy access
export const getSectionContent = (sectionKey: keyof EssayContent['sections']) => {
  return essayContent.sections[sectionKey];
};

export const getMetadata = () => {
  return essayContent.metadata;
};

export const getTypingDelays = () => {
  return essayContent.typing.delays;
};

export const getUIContent = () => {
  return essayContent.ui;
};

export const getSocialLinks = () => {
  return essayContent.social;
};
