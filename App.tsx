
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import DashboardScreen from './components/DashboardScreen';
import UploadScreen from './components/UploadScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';
import HistoryDetailScreen from './components/HistoryDetailScreen';
import ErrorScreen from './components/ErrorScreen';
import AboutScreen from './components/AboutScreen';
import HelpScreen from './components/HelpScreen';
import LogoutConfirmScreen from './components/LogoutConfirmScreen';

type View = 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'history-detail' | 'error' | 'about' | 'help' | 'logout-confirm';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [viewBeforeLogout, setViewBeforeLogout] = useState<View | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);

  const handleRequestLogout = () => {
    setViewBeforeLogout(currentView);
    setCurrentView('logout-confirm');
  };

  const handleConfirmLogout = () => {
    setSelectedImage(null);
    setSelectedHistoryItem(null);
    setViewBeforeLogout(null);
    setCurrentView('login');
  };

  const handleCancelLogout = () => {
    if (viewBeforeLogout) {
      setCurrentView(viewBeforeLogout);
    } else {
      setCurrentView('dashboard');
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setCurrentView('upload');
  };

  const handleViewHistoryDetail = (item: any) => {
    setSelectedHistoryItem(item);
    setCurrentView('history-detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {currentView === 'login' && (
        <LoginScreen 
          onNavigateToSignup={() => setCurrentView('signup')} 
          onNavigateToForgotPassword={() => setCurrentView('forgot-password')}
          onLoginSuccess={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'signup' && (
        <SignupScreen onNavigateToLogin={() => setCurrentView('login')} />
      )}
      {currentView === 'forgot-password' && (
        <ForgotPasswordScreen onNavigateToLogin={() => setCurrentView('login')} />
      )}
      {currentView === 'dashboard' && (
        <DashboardScreen 
          onLogout={handleRequestLogout} 
          onNavigateToUpload={() => setCurrentView('upload')}
          onNavigateToHistory={() => setCurrentView('history')}
          onNavigateToAbout={() => setCurrentView('about')}
          onNavigateToHelp={() => setCurrentView('help')}
        />
      )}
      {currentView === 'upload' && (
        <UploadScreen 
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
          onBack={() => setCurrentView('dashboard')}
          onLogout={handleRequestLogout}
          onRunClassification={() => setCurrentView('processing')}
          onError={() => setCurrentView('error')}
        />
      )}
      {currentView === 'processing' && (
        <ProcessingScreen 
          onLogout={handleRequestLogout} 
          onComplete={() => setCurrentView('results')}
        />
      )}
      {currentView === 'results' && (
        <ResultsScreen 
          image={selectedImage}
          onAnalyzeAnother={resetAnalysis}
          onNavigateToHistory={() => setCurrentView('history')}
          onLogout={handleRequestLogout}
        />
      )}
      {currentView === 'history' && (
        <HistoryScreen 
          onBack={() => setCurrentView('dashboard')}
          onLogout={handleRequestLogout}
          onViewDetails={handleViewHistoryDetail}
        />
      )}
      {currentView === 'history-detail' && (
        <HistoryDetailScreen 
          item={selectedHistoryItem}
          onBack={() => setCurrentView('history')}
          onLogout={handleRequestLogout}
        />
      )}
      {currentView === 'error' && (
        <ErrorScreen 
          onBackToUpload={resetAnalysis}
          onLogout={handleRequestLogout}
        />
      )}
      {currentView === 'about' && (
        <AboutScreen 
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'help' && (
        <HelpScreen 
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'logout-confirm' && (
        <LogoutConfirmScreen 
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default App;
