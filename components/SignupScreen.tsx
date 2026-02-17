
import React from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface SignupScreenProps {
  onNavigateToLogin: () => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onNavigateToLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-xl mb-4">
            <svg 
              className="w-6 h-6 text-teal-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
            Create Account
          </h1>
          <p className="text-slate-500 text-sm">
            Access our advanced clinical diagnostic support system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-1">
          <Input 
            label="Name (Optional)" 
            type="text" 
            placeholder="Enter your full name"
          />
          <Input 
            label="Email" 
            type="text" 
            placeholder="Enter your email id"
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
          />
          <Input 
            label="Confirm Password" 
            type="password" 
            placeholder="••••••••"
          />
          
          <div className="pt-4">
            <Button type="submit">
              Create Account
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <button 
            onClick={onNavigateToLogin}
            className="w-full text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors text-center flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </button>
        </div>
      </div>

      <footer className="mt-12 text-center max-w-sm px-4">
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed">
          Clinical Support Tool. Designed to assist medical professionals.
        </p>
      </footer>
    </div>
  );
};

export default SignupScreen;
