import type { ClassResult } from './types';

/**
 * Sends a base64 data-URL image to the FastAPI classification endpoint.
 *
 * Expected backend response:
 *   { "classes": [{ "id": "mel", "name": "Melanoma", "score": 67.4 }, ...] }
 *
 * Environment variable (optional):
 *   VITE_API_URL — base URL of the deployed FastAPI backend
 *   e.g. https://dermalyze-api.onrender.com
 *
 * If not set, requests fall back to '/api' for local Vite proxy usage.
 */
export async function classifyImage(imageDataUrl: string): Promise<ClassResult[]> {
  const configuredApiUrl = import.meta.env.VITE_API_URL as string | undefined;
  const apiBase = (configuredApiUrl?.trim() || '/api').replace(/\/$/, '');

  // Convert base64 data URL → Blob so we can send as multipart/form-data
  const res = await fetch(imageDataUrl);
  const blob = await res.blob();

  const form = new FormData();
  // Backend expects the field name "file"
  form.append('file', blob, 'image.jpg');

  const response = await fetch(`${apiBase}/classify`, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => response.statusText);
    throw new Error(`Classification failed (${response.status}): ${detail}`);
  }

  const data = await response.json() as { classes: ClassResult[] };
  return data.classes;
}
