
import React from 'react';
import Button from './ui/Button';
import { AnalysisHistoryItem } from './HistoryScreen';

interface HistoryDetailScreenProps {
  item: AnalysisHistoryItem | null;
  onBack: () => void;
  onLogout: () => void;
}

const HistoryDetailScreen: React.FC<HistoryDetailScreenProps> = ({ item, onBack, onLogout }) => {
  if (!item) return null;

  // Mock data for breakdown, ensuring the predicted class has the highest score
  const classes = [
    { id: 'akiec', name: 'Actinic keratoses and intraepithelial carcinoma', score: item.classId === 'akiec' ? item.confidence : 2.4 },
    { id: 'bcc', name: 'Basal cell carcinoma', score: item.classId === 'bcc' ? item.confidence : 10.2 },
    { id: 'bkl', name: 'Benign keratosis-like lesions', score: item.classId === 'bkl' ? item.confidence : 6.8 },
    { id: 'df', name: 'Dermatofibroma', score: item.classId === 'df' ? item.confidence : 1.5 },
    { id: 'mel', name: 'Melanoma', score: item.classId === 'mel' ? item.confidence : 5.1 },
    { id: 'nv', name: 'Melanocytic nevi', score: item.classId === 'nv' ? item.confidence : 4.3 },
    { id: 'vasc', name: 'Vascular lesions', score: item.classId === 'vasc' ? item.confidence : 0.9 }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-12 text-slate-900">
      {/* Header Navigation */}
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

      <main className="max-w-4xl mx-auto w-full px-6 py-8 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analysis Record Detail</h1>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Case ID</span>
             <span className="text-sm font-bold text-slate-900">#ANL-{item.id}00{item.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Probabilities breakdown */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Historical Classification</h2>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block mb-0.5">Analysis Timestamp</span>
                  <span className="text-xs font-semibold text-slate-700">{item.date} at {item.time}</span>
                </div>
              </div>

              <div className="flex items-end gap-4 mb-4">
                <span className="text-4xl font-extrabold text-teal-700 tracking-tighter">
                  {item.classId.toUpperCase()}
                </span>
                <span className="text-slate-400 font-medium mb-1">({item.className})</span>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl font-bold text-slate-800">{item.confidence.toFixed(1)}%</div>
                <div className="text-sm font-medium text-slate-500">Confidence Score</div>
              </div>

              <div className="h-px bg-slate-100 w-full my-8"></div>

              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Probability Distribution Breakdown</h2>
              <div className="space-y-5">
                {classes.map((cls) => (
                  <div key={cls.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className={`${cls.id === item.classId ? 'text-teal-700' : 'text-slate-600'} flex gap-2`}>
                        <span className="uppercase w-10">{cls.id}</span>
                        <span className="text-slate-400 font-normal">{cls.name}</span>
                      </span>
                      <span className={cls.id === item.classId ? 'text-teal-700' : 'text-slate-500'}>
                        {cls.score.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ease-out ${cls.id === item.classId ? 'bg-teal-600' : 'bg-slate-300'}`}
                        style={{ width: `${cls.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Image & Metadata */}
          <div className="space-y-8">
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Analyzed Image</h2>
              <div className="aspect-square w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center relative">
                 {item.imageUrl ? (
                   <img src={item.imageUrl} alt="Analyzed lesion" className="w-full h-full object-cover" />
                 ) : (
                   <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                 )}
              </div>
              <p className="mt-4 text-[10px] text-slate-400 font-medium leading-relaxed italic text-center">
                {item.imageUrl ? 'Historical image retrieved from session archive.' : 'Low-resolution thumbnail stored in session archive.'}
              </p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Record Metadata</h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Inference Server</span>
                  <span className="text-sm font-medium text-slate-700">Dermalyze Node #02</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Engine Version</span>
                  <span className="text-sm font-medium text-slate-700">EfficientNet-V2 (Clinical Support)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Storage Location</span>
                  <span className="text-sm font-medium text-slate-700">Local Browser Cache</span>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <Button onClick={onBack}>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                  </svg>
                  Back to History
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 text-center border-t border-slate-100 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic mb-4">
            “Historical records are provided for longitudinal review. Classification scores serve as diagnostic aids.”
          </p>
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed">
            Clinical Decision Support. Assists, does not replace, professional judgment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HistoryDetailScreen;
