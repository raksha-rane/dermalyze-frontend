
import React, { useState, useRef } from 'react';
import Button from './ui/Button';

interface UploadScreenProps {
  selectedImage: string | null;
  onImageSelect: (img: string | null) => void;
  onBack: () => void;
  onLogout: () => void;
  onRunClassification: () => void;
  onError: () => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ 
  selectedImage, 
  onImageSelect, 
  onBack, 
  onLogout, 
  onRunClassification,
  onError
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      onError();
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onBack}>
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
        <div className="max-w-xl w-full">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                Upload Image for Analysis
              </h2>
              <p className="text-slate-500 text-sm">
                Please provide a clear dermatoscopic image of the lesion.
              </p>
            </div>

            <div 
              className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 flex flex-col items-center justify-center min-h-[300px] p-6 text-center
                ${selectedImage ? 'border-teal-500 bg-teal-50/10' : 'border-slate-200 hover:border-teal-400 hover:bg-slate-50/50'}
                ${isDragging ? 'border-teal-500 bg-teal-50 ring-4 ring-teal-500/10' : ''}
                ${!selectedImage ? 'cursor-pointer' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={selectedImage ? undefined : triggerFileInput}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png"
                className="hidden"
              />

              {!selectedImage ? (
                <>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Accepted formats: JPG or PNG</p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center">
                  <div className="relative group max-w-full">
                    <img 
                      src={selectedImage} 
                      alt="Dermatoscopic Preview" 
                      className="max-h-[240px] w-auto rounded-lg shadow-md border border-white"
                    />
                    <button 
                      onClick={clearSelection}
                      className="absolute -top-3 -right-3 bg-white text-slate-400 hover:text-red-500 rounded-full p-1.5 shadow-lg border border-slate-100 transition-colors"
                      title="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-4 text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                    Image selected successfully
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <Button disabled={!selectedImage} onClick={onRunClassification}>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Run Classification
                </div>
              </Button>
              <Button variant="secondary" onClick={onBack}>
                Cancel
              </Button>
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

export default UploadScreen;
