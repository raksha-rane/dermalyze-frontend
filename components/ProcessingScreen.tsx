
import React, { useEffect } from 'react';

interface ProcessingScreenProps {
  onLogout: () => void;
  onComplete: () => void;
}

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onLogout, onComplete }) => {
  useEffect(() => {
    // Artificial 15-second delay to simulate medical image processing
    const timer = setTimeout(() => {
      onComplete();
    }, 15000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="bg-teal-600 rounded-lg p-1.5">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Dermalyze</span>
        </div>
        
        <button 
          onClick={onLogout}
          className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          Logout
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-12 sm:p-16 shadow-sm flex flex-col items-center">
            
            <div className="relative mb-10">
              <div className="w-20 h-20 rounded-full border-4 border-slate-100"></div>
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-teal-600 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-teal-50 rounded-full animate-pulse flex items-center justify-center">
                   <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
              Analyzing image…
            </h2>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed px-4">
              Our AI-assisted system is evaluating the dermatoscopic features. This may take a few seconds.
            </p>

            <div className="w-full space-y-3 opacity-40 pointer-events-none">
              <div className="w-full h-11 bg-slate-100 rounded-full"></div>
              <div className="w-full h-11 border border-slate-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center bg-slate-50">
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed px-6">
          Designed to assist medical professionals. Not a replacement for clinical diagnosis.
        </p>
      </footer>
    </div>
  );
};

export default ProcessingScreen;
