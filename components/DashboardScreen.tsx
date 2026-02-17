
import React from 'react';
import Button from './ui/Button';

interface DashboardScreenProps {
  onLogout: () => void;
  onNavigateToUpload: () => void;
  onNavigateToHistory: () => void;
  onNavigateToAbout: () => void;
  onNavigateToHelp: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  onLogout, 
  onNavigateToUpload, 
  onNavigateToHistory,
  onNavigateToAbout,
  onNavigateToHelp
}) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex flex-wrap gap-y-4 justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-teal-600 rounded-lg p-1.5">
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Dermalyze</span>
          </div>
          
          <nav className="flex items-center border-l border-slate-100 pl-4 sm:pl-6 h-6 gap-3 sm:gap-4">
            <button 
              onClick={onNavigateToAbout}
              className="text-xs sm:text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={onNavigateToHelp}
              className="text-xs sm:text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
            >
              Help
            </button>
          </nav>
        </div>
        
        <button 
          onClick={onLogout}
          className="text-xs sm:text-sm font-medium text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          <span className="hidden xs:inline">Logout</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-16 shadow-sm">
            <div className="mb-6 sm:mb-8 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-teal-50 rounded-full text-teal-600">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Welcome to Dermalyze
            </h2>
            
            <p className="text-slate-500 text-base sm:text-lg mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed">
              Upload a dermatoscopic image to utilize our AI-assisted diagnostic support suite for lesion classification.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="w-full sm:w-64">
                <Button onClick={onNavigateToUpload}>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Image
                  </div>
                </Button>
              </div>
              <div className="w-full sm:w-64">
                <Button variant="secondary" onClick={onNavigateToHistory}>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    View Past Analyses
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-8 text-center bg-slate-50 mt-auto">
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed px-4">
          Designed to assist medical professionals. Not a replacement for clinical diagnosis.
        </p>
      </footer>
    </div>
  );
};

export default DashboardScreen;
