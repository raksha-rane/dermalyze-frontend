/**
 * Shared type definitions used across the frontend and matching the
 * FastAPI backend response schema + Supabase `analyses` table schema.
 */

/** One class in the probability distribution returned by the backend. */
export interface ClassResult {
  id: string;   // e.g. "mel"
  name: string; // e.g. "Melanoma"
  score: number; // 0-100 percentage
}

/** Shape of a row in the Supabase `analyses` table. */
export interface AnalysisRecord {
  id: string;
  user_id: string;
  created_at: string;         // ISO 8601
  image_url: string | null;
  predicted_class_id: string;
  predicted_class_name: string;
  confidence: number;
  all_scores: ClassResult[];
}

/** UI representation used by HistoryScreen and HistoryDetailScreen. */
export interface AnalysisHistoryItem {
  id: string;
  date: string;   // formatted for display
  time: string;
  classId: string;
  className: string;
  confidence: number;
  imageUrl?: string | null;
  allScores?: ClassResult[]; // full distribution, available for DB-backed records
}
