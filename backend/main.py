"""
main.py — FastAPI inference server for Dermalyze.

Endpoints:
  GET  /          → health check
  POST /classify  → accepts an image file, returns class probabilities
"""

import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from model import classify

# ── App setup ─────────────────────────────────────────────────────────────────
app = FastAPI(
    title="Dermalyze Inference API",
    description="HAM10000 skin lesion classification (7 classes)",
    version="1.0.0",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
# Set CORS_ORIGINS env var to a comma-separated list of allowed origins.
# Example: "https://your-app.netlify.app,http://localhost:3000"
_raw_origins = os.environ.get("CORS_ORIGINS", "http://localhost:3000")
origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ── Response schema ───────────────────────────────────────────────────────────
class ClassResult(BaseModel):
    id: str
    name: str
    score: float


class ClassifyResponse(BaseModel):
    classes: List[ClassResult]


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
def health():
    return {"status": "ok", "model": "HAM10000 7-class classifier"}


@app.post("/classify", response_model=ClassifyResponse, tags=["Inference"])
async def classify_image(file: UploadFile = File(...)):
    """
    Accept a skin-lesion image (JPEG / PNG) and return probabilities
    for all 7 HAM10000 classes sorted highest-first.
    """
    if file.content_type not in ("image/jpeg", "image/png", "image/webp"):
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported media type '{file.content_type}'. Send JPEG, PNG, or WebP.",
        )

    image_bytes = await file.read()
    if len(image_bytes) > 20 * 1024 * 1024:  # 20 MB guard
        raise HTTPException(status_code=413, detail="Image exceeds 20 MB limit.")

    try:
        results = classify(image_bytes)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Inference failed: {exc}")

    return ClassifyResponse(classes=results)
