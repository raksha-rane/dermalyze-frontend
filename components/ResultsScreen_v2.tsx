import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import ResultCard from './ui/ResultCard';
import ProbabilityChart from './ui/ProbabilityChart';
import ImageCard from './ui/ImageCard';
import MedicalInfoCard from './ui/MedicalInfoCard';
import { classInfoMap } from '../lib/classInfo';

interface ResultsScreenProps {
  image: string | null;
  onAnalyzeAnother: () => void;
  onNavigateToHistory: () => void;
  onLogout: () => void;
}

/**
 * ResultsScreen — Primary analysis output view.
 *
 * Redesigned following Laws of UX:
 *
 * 1. Jakob's Law — Layout mirrors EHR / radiology PACS conventions:
 *    header with patient/case metadata, prominent diagnosis, two-column
 *    detail view, and a subdued clinical disclaimer footer.
 *
 * 2. Visual Hierarchy — The predicted class name is the largest text on
 *    screen, followed by the confidence score. Secondary information
 *    (probability distribution, image, medical info) is subordinate.
 *
 * 3. Hick's Law — Probability bars are sorted descending so the eye
 *    lands on the dominant prediction immediately. Action buttons are
 *    reduced to two clear choices.
 *
 * 4. Miller's Law — 7 classes (within 7±2 limit). Medical info is
 *    chunked into 4 labeled sections instead of free-form text.
 *
 * 5. Aesthetic-Usability Effect — Neutral medical palette (white, slate,
 *    subtle teal accent), generous spacing, and clean card borders evoke
 *    trust and professionalism.
 *
 * 6. Law of Proximity — Related data (confidence + risk badge) are
 *    adjacent. Image and medical info are in the same column.
 *
 * 7. Law of Common Region — Each logical group lives in its own bordered
 *    card, making the interface instantly scannable.
 *
 * 8. Doherty Threshold — Skeleton loading state provides < 400ms
 *    perceived feedback. Bar animations give immediate visual response.
 *
 * 9. Tesler's Law — Irrelevant metadata removed. Complexity that must
 *    exist (7-class distribution) is presented in the simplest form.
 *
 * 10. Fitts's Law — Primary CTA ("Analyze Another") is full-width with
 *     generous padding. Back button in header is large tap-target.
 */
const ResultsScreen: React.FC<ResultsScreenProps> = ({
  image,
  onAnalyzeAnother,
  onNavigateToHistory,
  onLogout,
}) => {
  const [loading, setLoading] = useState(true);

  // Doherty Threshold: skeleton -> content in < 400ms
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  // Mock data — 7 classes (Miller's Law)
  const classes = [
    { id: 'akiec', name: 'Actinic keratoses and intraepithelial carcinoma', score: 4.2 },
    { id: 'bcc', name: 'Basal cell carcinoma', score: 12.8 },
    { id: 'bkl', name: 'Benign keratosis-like lesions', score: 8.5 },
    { id: 'df', name: 'Dermatofibroma', score: 2.1 },
    { id: 'mel', name: 'Melanoma', score: 67.4 },
    { id: 'nv', name: 'Melanocytic nevi', score: 3.5 },
    { id: 'vasc', name: 'Vascular lesions', score: 1.5 },
  ];

  const predictedClass = classes.reduce((prev, cur) =>
    prev.score > cur.score ? prev : cur,
  );
  const info = classInfoMap[predictedClass.id];

  // Deterministic case ID
  const caseId = `DRM-${Date.now().toString(36).slice(-6).toUpperCase()}`;
  const analysisDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  /* Skeleton loading state (Doherty Threshold) */
  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />
            <div className="w-24 h-5 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="w-20 h-4 bg-slate-100 rounded animate-pulse" />
          <div className="w-16 h-4 bg-slate-100 rounded animate-pulse" />
        </header>
        <main className="max-w-6xl mx-auto w-full px-6 py-8 space-y-6">
          <div className="h-40 bg-white border border-slate-200 rounded-xl animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 h-72 bg-white border border-slate-200 rounded-xl animate-pulse" />
            <div className="lg:col-span-2 space-y-6">
              <div className="h-52 bg-white border border-slate-200 rounded-xl animate-pulse" />
              <div className="h-48 bg-white border border-slate-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* TOP HEADER — Jakob's Law: mirrors EHR header conventions */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left — Logo */}
          <div className="flex items-center gap-2.5">
            <div className="bg-teal-600 rounded-lg p-1.5">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Dermalyze</span>
          </div>

          {/* Center — Page title */}
          <h1 className="hidden md:block text-sm font-semibold text-slate-500 uppercase tracking-widest">
            Analysis Result
          </h1>

          {/* Right — Case metadata + actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Case ID
              </span>
              <span className="text-xs font-semibold text-slate-700 tabular-nums">{caseId}</span>
            </div>
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Date
              </span>
              <span className="text-xs font-semibold text-slate-700">{analysisDate}</span>
            </div>
            <div className="w-px h-6 bg-slate-200 hidden sm:block" />
            <button
              onClick={onLogout}
              className="text-xs font-medium text-slate-400 hover:text-red-600 transition-colors px-2 py-1.5 rounded-md hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        {/* PRIMARY RESULT CARD — Visual Hierarchy: first and largest element */}
        <ResultCard
          classId={predictedClass.id}
          className={predictedClass.name}
          confidence={predictedClass.score}
          info={info}
        />

        {/* TWO-COLUMN LAYOUT — Law of Proximity groups related content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column — 3/5 width: probability distribution (Hick's Law: sorted) */}
          <div className="lg:col-span-3">
            <ProbabilityChart classes={classes} predictedClassId={predictedClass.id} />
          </div>

          {/* Right column — 2/5 width: image + medical info (Law of Common Region) */}
          <div className="lg:col-span-2 space-y-6">
            <ImageCard imageUrl={image} />
            <MedicalInfoCard info={info} />

            {/* Action buttons — Fitts's Law: large, full-width targets */}
            <div className="flex flex-col gap-3">
              <Button onClick={onAnalyzeAnother}>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Analyze Another Image
                </span>
              </Button>
              <Button variant="secondary" onClick={onNavigateToHistory}>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Past Analyses
                </span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER — Clinical disclaimer (Tesler's Law: required but visually subordinate) */}
      <footer className="mt-auto py-6 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[11px] text-slate-400 leading-relaxed text-center">
            This tool generates probabilistic outputs from a machine learning model. It is designed
            to assist clinical decision-making and does not replace professional medical diagnosis.
            Always correlate with clinical findings and patient history.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResultsScreen;
