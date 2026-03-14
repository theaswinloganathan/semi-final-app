import { useState } from 'react';
import { TranslationProvider, useTranslation } from './hooks/useTranslation';
import LanguageSelection from './pages/LanguageSelection';
import RoleSelection from './pages/RoleSelection';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

// No login import needed here

import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import { getTrainees } from './services/api';
import { traineesData as mockTrainees } from './services/mockData';

type AppStep = 'LANGUAGE' | 'ROLE' | 'ADMIN_LOGIN' | 'USER_LOGIN' | 'USER_PANEL' | 'ADMIN_PANEL';

const AppContent = () => {
  const [step, setStep] = useState<AppStep>('LANGUAGE');
  const [userError, setUserError] = useState('');
  const { setLanguage } = useTranslation();

  const handleLanguageSelect = (lang: 'en' | 'ta' | 'hi') => {
    setLanguage(lang);
    setStep('ROLE');
  };

  const handleRoleSelect = (role: 'admin' | 'user') => {
    setStep(role === 'admin' ? 'ADMIN_LOGIN' : 'USER_LOGIN');
  };

  const handleAdminLoginSuccess = () => {
    setStep('ADMIN_PANEL');
  };

  const handleUserLogin = async (userId: string, pass: string) => {
    setUserError('');
    try {
      let trainees = [];
      try {
        const res = await getTrainees();
        trainees = res.data.length > 0 ? res.data : mockTrainees;
      } catch (e) {
        trainees = mockTrainees;
      }

      // Validate credentials
      // Normalize comparison: traineeId can be numeric or string, row.id is 1-indexed fallback
      const user = trainees.find((t: any) => {
        const tId = t.traineeId || (10000 + t.id).toString();
        const tPass = t.password || 'AB12'; // Default mock password if not set
        return tId === userId && tPass === pass;
      });

      if (user) {
        setStep('USER_PANEL');
      } else {
        setUserError('Invalid User ID or Password');
      }
    } catch (err) {
      console.error("Login verification failed", err);
      setUserError('System error. Please try again.');
    }
  };

  const handleLogout = () => {
    setStep('ROLE');
  };

  switch (step) {
    case 'LANGUAGE':
      return <LanguageSelection onSelect={handleLanguageSelect} />;
    case 'ROLE':
      return <RoleSelection onSelect={handleRoleSelect} />;
    case 'ADMIN_LOGIN':
      return <AdminLogin onLogin={handleAdminLoginSuccess} />;
    case 'USER_LOGIN':
      return <UserLogin onLogin={handleUserLogin} error={userError} />;
    case 'USER_PANEL':
      return <UserDashboard onLogout={handleLogout} />;
    case 'ADMIN_PANEL':
      return <AdminDashboard onLogout={handleLogout} />;
    default:
      return <LanguageSelection onSelect={handleLanguageSelect} />;
  }
};

import VoiceAssistant from './components/VoiceAssistant';

function App() {
  return (
    <TranslationProvider>
      <AppContent />
      <VoiceAssistant />
    </TranslationProvider>
  );
}

export default App;
