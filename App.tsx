
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
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
import ResetPasswordScreen from './components/ResetPasswordScreen';

type View = 'login' | 'signup' | 'forgot-password' | 'reset-password' | 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'history-detail' | 'error' | 'about' | 'help' | 'logout-confirm';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [viewBeforeLogout, setViewBeforeLogout] = useState<View | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    // Check if this is a password recovery redirect (URL contains type=recovery)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const isRecovery = hashParams.get('type') === 'recovery';

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isRecovery && session) {
        setCurrentView('reset-password');
      } else if (session) {
        setCurrentView('dashboard');
      }
      setAuthChecked(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setCurrentView('reset-password');
        return;
      }
      if (!session && currentView !== 'signup' && currentView !== 'forgot-password') {
        setCurrentView('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleRequestLogout = () => {
    setViewBeforeLogout(currentView);
    setCurrentView('logout-confirm');
  };

  const handleConfirmLogout = async () => {
    await supabase.auth.signOut();
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
      {!authChecked ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-xl mb-4">
              <svg className="animate-spin h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <p className="text-sm text-slate-400">Loading...</p>
          </div>
        </div>
      ) : (
        <>
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
      {currentView === 'reset-password' && (
        <ResetPasswordScreen onPasswordReset={() => setCurrentView('login')} />
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
        </>
      )}
    </div>
  );
};

export default App;
