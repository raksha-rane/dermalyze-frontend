
import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface LoginScreenProps {
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onNavigateToSignup, 
  onNavigateToForgotPassword,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Demo credentials: admin@gmail.com / 12345
    if (email === 'admin@gmail.com' && password === '12345') {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please use admin@gmail.com / 12345 for demo access.');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-2xl mb-4">
            <svg 
              className="w-8 h-8 text-teal-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Dermalyze
          </h1>
          <p className="text-slate-500 text-sm">
            AI-Powered Clinical Decision Support System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg text-center font-medium">
              {error}
            </div>
          )}
          <Input 
            label="Email" 
            type="text" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="pt-4">
            <Button type="submit">
              Login
            </Button>
          </div>
        </form>

        <div className="mt-8 flex flex-col gap-3">
          <button 
            onClick={onNavigateToSignup}
            className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors text-center"
          >
            Create an account
          </button>
          <button 
            onClick={onNavigateToForgotPassword}
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors text-center"
          >
            Forgot password?
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

export default LoginScreen;
