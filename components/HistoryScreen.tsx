
import React from 'react';
import Button from './ui/Button';

interface HistoryScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onViewDetails: (item: AnalysisHistoryItem) => void;
}

export interface AnalysisHistoryItem {
  id: string;
  date: string;
  time: string;
  classId: string;
  className: string;
  confidence: number;
  imageUrl?: string;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack, onLogout, onViewDetails }) => {
  const historyItems: AnalysisHistoryItem[] = [
    { 
      id: '1', 
      date: 'Oct 24, 2023', 
      time: '14:32', 
      classId: 'mel', 
      className: 'Melanoma', 
      confidence: 67.4,
      imageUrl: '/images/1.jpg'
    },
    { 
      id: '2', 
      date: 'Oct 23, 2023', 
      time: '11:15', 
      classId: 'nv', 
      className: 'Melanocytic nevi', 
      confidence: 92.1,
      imageUrl: '/images/2.jpg'
    },
    { 
      id: '3', 
      date: 'Oct 21, 2023', 
      time: '09:45', 
      classId: 'bcc', 
      className: 'Basal cell carcinoma', 
      confidence: 54.8,
      imageUrl: '/images/3.jpg'
    },
    { 
      id: '4', 
      date: 'Oct 19, 2023', 
      time: '16:20', 
      classId: 'bkl', 
      className: 'Benign keratosis-like lesions', 
      confidence: 78.2,
      imageUrl: '/images/4.jpg'
    },
    { 
      id: '5', 
      date: 'Oct 15, 2023', 
      time: '13:05', 
      classId: 'df', 
      className: 'Dermatofibroma', 
      confidence: 88.5,
      imageUrl: '/images/5.jpg'
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 pb-12">
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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Past Analyses</h1>
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded uppercase tracking-wider">System Records</span>
        </div>

        <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Lesion Context</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date / Time</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Predicted Class</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300 border border-slate-200 overflow-hidden relative">
                           {item.imageUrl ? (
                             <img src={item.imageUrl} alt="Lesion thumbnail" className="w-full h-full object-cover" />
                           ) : (
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                           )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Case Reference</div>
                          <div className="text-sm font-semibold text-slate-700">#ANL-{item.id}00{item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700">{item.date}</span>
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-teal-700 uppercase">{item.classId}</span>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded tracking-tighter">{item.confidence.toFixed(1)}%</span>
                        </div>
                        <span className="text-xs text-slate-500">{item.className}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onViewDetails(item)}
                        className="text-teal-600 hover:text-teal-700 text-sm font-bold uppercase tracking-widest flex items-center gap-1 justify-end ml-auto group-hover:translate-x-1 transition-transform"
                      >
                        View Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="p-6 bg-blue-50/30 rounded-2xl border border-blue-100">
           <div className="flex gap-3">
             <div className="text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <p className="text-xs text-blue-700 font-medium leading-relaxed">
               Note: Analysis history is stored locally within the browser session for reference during the clinical workflow and is subject to a 10-item limit. Historical data is not synchronized across devices.
             </p>
           </div>
        </div>

        <div className="flex justify-center">
          <div className="max-w-xs w-full">
            <Button variant="secondary" onClick={onBack}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 text-center border-t border-slate-100 bg-white">
        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed">
          Clinical Support Tool. System architecture v2.0.4-pro
        </p>
      </footer>
    </div>
  );
};

export default HistoryScreen;
