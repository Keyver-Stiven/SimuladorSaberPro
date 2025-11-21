// Utility function to create page URLs
export const createPageUrl = (pageName) => {
  const pageMap = {
    'Home': '/',
    'Quiz': '/quiz',
    'Results': '/results',
    'Stats': '/stats'
  };

  return pageMap[pageName] || '/';
};

// Utility function to merge class names
export const cn = (...inputs) => {
  return inputs.filter(Boolean).join(' ');
};

// Format time in MM:SS format
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Get score color based on percentage
export const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-orange-600';
  return 'text-red-600';
};

// Shuffle array
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
