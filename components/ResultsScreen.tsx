
import React from 'react';
import Button from './ui/Button';

interface ResultsScreenProps {
  image: string | null;
  onAnalyzeAnother: () => void;
  onNavigateToHistory: () => void;
  onLogout: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ image, onAnalyzeAnother, onNavigateToHistory, onLogout }) => {
  // Mock data as requested: Exactly 7 classes
  const classes = [
    { id: 'akiec', name: 'Actinic keratoses and intraepithelial carcinoma', score: 4.2 },
    { id: 'bcc', name: 'Basal cell carcinoma', score: 12.8 },
    { id: 'bkl', name: 'Benign keratosis-like lesions', score: 8.5 },
    { id: 'df', name: 'Dermatofibroma', score: 2.1 },
    { id: 'mel', name: 'Melanoma', score: 67.4 },
    { id: 'nv', name: 'Melanocytic nevi', score: 3.5 },
    { id: 'vasc', name: 'Vascular lesions', score: 1.5 }
  ];

  const predictedClass = classes.reduce((prev, current) => (prev.score > current.score) ? prev : current);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-12 text-slate-900">
      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onAnalyzeAnother}>
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

      <main className="max-w-4xl mx-auto w-full px-6 py-8 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Classification Results</h1>
          <div className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded uppercase tracking-wider">Analysis Complete</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Primary Result & Probabilities */}
          <div className="md:col-span-2 space-y-8">
            {/* Primary Result Section */}
            <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-slate-400">Predicted Classification</h2>
              <div className="flex items-end gap-4 mb-4">
                <span className="text-4xl font-extrabold text-teal-700 tracking-tighter">
                  {predictedClass.id.toUpperCase()}
                </span>
                <span className="text-slate-400 font-medium mb-1">({predictedClass.name})</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl font-bold text-slate-800">{predictedClass.score.toFixed(1)}%</div>
                <div className="text-sm font-medium text-slate-500">Confidence Score</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  “Confidence represents the model’s predicted probability for the selected class.”
                </p>
              </div>
            </section>

            {/* Probability Visualization Section */}
            <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Probability Distribution</h2>
              <div className="space-y-5">
                {classes.map((cls) => (
                  <div key={cls.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className={`${cls.id === predictedClass.id ? 'text-teal-700' : 'text-slate-600'} flex gap-2`}>
                        <span className="uppercase w-10">{cls.id}</span>
                        <span className="text-slate-400 font-normal">{cls.name}</span>
                      </span>
                      <span className={cls.id === predictedClass.id ? 'text-teal-700' : 'text-slate-500'}>
                        {cls.score.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${cls.id === predictedClass.id ? 'bg-teal-600' : 'bg-slate-300'}`}
                        style={{ width: `${cls.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Image Context & Model Info */}
          <div className="space-y-8">
            {/* Image Context Section */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Input Image</h2>
              <div className="aspect-square w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center">
                {image ? (
                  <img src={image} alt="Input" className="object-cover w-full h-full" />
                ) : (
                  <div className="text-slate-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Capture Metadata</span>
                <span className="text-xs text-slate-600 font-medium">Standard Dermatoscopy (1:1)</span>
              </div>
            </section>

            {/* Model Information Section */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Model Information</h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Architecture</span>
                  <span className="text-sm font-medium text-slate-700">EfficientNet-V2</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Inference Type</span>
                  <span className="text-sm font-medium text-slate-700">Server-side inference</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Output Format</span>
                  <span className="text-sm font-medium text-slate-700">Multi-class probability distribution</span>
                </div>
              </div>
            </section>

            {/* User Actions */}
            <div className="space-y-3">
              <Button onClick={onAnalyzeAnother}>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Analyze Another Image
                </div>
              </Button>
              <Button variant="secondary" onClick={onNavigateToHistory}>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Past Analyses
                </div>
              </Button>
              <button 
                onClick={onLogout}
                className="w-full text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors py-2"
              >
                Logout from System
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 text-center border-t border-slate-100 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
            “Results are probabilistic outputs generated by a machine learning model.
            This tool is designed to assist clinical decision-making and should not replace professional medical diagnosis.”
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResultsScreen;
