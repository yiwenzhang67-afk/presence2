import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GuideScreen from './components/GuideScreen';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  const startGuide = () => {
    setHasStarted(true);
  };

  const returnHome = () => {
    setHasStarted(false);
  };

  return (
    <main className="w-full min-h-screen bg-earth-50 text-earth-900 font-sans selection:bg-sage-200 selection:text-sage-900">
      {hasStarted ? (
        <GuideScreen onReturn={returnHome} />
      ) : (
        <WelcomeScreen onStart={startGuide} />
      )}
    </main>
  );
};

export default App;