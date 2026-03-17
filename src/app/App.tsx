import { Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { Features } from './components/Features';
import { TargetAudience } from './components/TargetAudience';
import { TechStack } from './components/TechStack';
import { Footer } from './components/Footer';
import ProtectedRoute from '../context/authContext/ProtectedRoute';
import { CoverPage } from './components/CoverPage';
//login and signup pages
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignUpPage';
import { AuthPage } from './components/AuthPage';
import { GameMenu } from './components/GameMenu';
import { GamePlay } from './components/GamePlay';
import { SinglePlayMenu } from './components/SinglePlayMenu';
import { AdminLevelCreate } from './components/AdminLevelCreate';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/game-menu" element={<ProtectedRoute><GameMenu /></ProtectedRoute>} />
      <Route path="/game-play" element={<ProtectedRoute><GamePlay /></ProtectedRoute>} />
      <Route path="/single-play-menu" element={<ProtectedRoute><SinglePlayMenu /></ProtectedRoute>} />
      <Route path="/admin-level-create" element={<ProtectedRoute><AdminLevelCreate /></ProtectedRoute>} />

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