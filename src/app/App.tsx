import { Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
import { Hero } from './components/featurepage/Hero';
import { ProblemSolution } from './components/featurepage/ProblemSolution';
import { Features } from './components/featurepage/Features';
import { TargetAudience } from './components/featurepage/TargetAudience';
import { TechStack } from './components/featurepage/TechStack';
import { Footer } from './components/featurepage/Footer';
import ProtectedRoute from '../context/authContext/ProtectedRoute';
import { CoverPage } from './components/CoverPage';
//login and signup pages
import { LoginPage } from './components/unused/LoginPage';
import { SignupPage } from './components/unused/SignUpPage';
import { AuthPage } from './components/unused/AuthPage';
import { GameMenu } from './components/GameMenu';
import { GamePlay } from './components/GamePlay';
import { SinglePlayMenu } from './components/SinglePlayMenu';
import { LevelCreate } from './components/LevelCreate';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      {/* <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> */}
      <Route path="/game-menu" element={/*<ProtectedRoute>*/<GameMenu />/*</ProtectedRoute>*/} />
      <Route path="/game-play" element={/*<ProtectedRoute>*/<GamePlay />/*<ProtectedRoute>*/} />
      <Route path="/single-play-menu" element={/*<ProtectedRoute>*/<SinglePlayMenu />/*<ProtectedRoute>*/} />
      <Route path="/level-create" element={/*<ProtectedRoute>*/<LevelCreate />/*<ProtectedRoute>*/} />
            {/* <Route path="/level-create" element={<AdminLevelCreate />} /> */}

        {/* Landing page with features and about the game */}
      <Route path="/landing" element={
        <div className="min-h-screen bg-black">
          <Hero />
          <ProblemSolution />
          <Features />
          <TargetAudience />
          <TechStack />
          <Footer />
        </div>
      } />
    </Routes>
  );
}