import { useState } from 'react';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { Features } from './components/Features';
import { TargetAudience } from './components/TargetAudience';
import { TechStack } from './components/TechStack';
import { Footer } from './components/Footer';
import { CoverPage } from './components/CoverPage';
import { AuthPage } from './components/AuthPage';
import { GameMenu } from './components/GameMenu';
import { GamePlay } from './components/GamePlay';

export default function App() {
  const [currentView, setCurrentView] = useState<'cover' | 'landing' | 'auth' | 'gameMenu' | 'gameplay'>('cover');

  const handlePlay = () => {
    setCurrentView('auth');
  };

  const handleAboutUs = () => {
    setCurrentView('landing');
  };

  const handleBackToCover = () => {
    setCurrentView('cover');
  };

  const handleLoginSuccess = () => {
    setCurrentView('gameMenu');
  };

  const handleLogout = () => {
    setCurrentView('cover');
  };

  const handleStartGame = () => {
    setCurrentView('gameplay');
  };

  const handleBackToMenu = () => {
    setCurrentView('gameMenu');
  };

  // Show cover page (initial view)
  if (currentView === 'cover') {
    return <CoverPage onPlay={handlePlay} onAboutUs={handleAboutUs} />;
  }

  // Show auth page
  if (currentView === 'auth') {
    return <AuthPage onBack={handleBackToCover} onLoginSuccess={handleLoginSuccess} />;
  }

  // Show game menu after login
  if (currentView === 'gameMenu') {
    return <GameMenu onLogout={handleLogout} onStartGame={handleStartGame} />;
  }

  // Show gameplay
  if (currentView === 'gameplay') {
    return <GamePlay onBack={handleBackToMenu} />;
  }

  // Show landing page (features and about the game)
  return (
    <div className="min-h-screen bg-black">
      <Hero onBackToCover={handleBackToCover} />
      <ProblemSolution />
      <Features />
      <TargetAudience />
      <TechStack />
      <Footer />
    </div>
  );
}