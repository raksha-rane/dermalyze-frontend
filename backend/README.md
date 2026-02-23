# Dermalyze Backend

FastAPI inference server for HAM10000 skin lesion classification (7 classes).

---

## Local development

### Prerequisites
- Python 3.10+
- Your trained `.pt` model file

### Setup

```bash
cd backend

# Create a virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies (CPU-only PyTorch — saves ~800 MB vs CUDA build)
pip install -r requirements.txt

# Place your model in the backend directory
cp /path/to/your/model.pt ./model.pt
```

### Environment variables

| Variable | Default | Description |
|---|---|---|
| `MODEL_PATH` | `./model.pt` | Path to the `.pt` model file |
| `USE_JIT` | `true` | `true` = TorchScript model; `false` = state-dict (requires editing `model.py`) |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated allowed frontend origins |
| `PORT` | `8000` | Uvicorn listen port (Render sets this automatically) |

### Run

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API docs available at `http://localhost:8000/docs`

---

## Model format

### Option A — TorchScript (recommended)
Save your trained model as a TorchScript file:

```python
scripted = torch.jit.script(model)  # or torch.jit.trace(model, example_input)
torch.jit.save(scripted, "model.pt")
```

Set `USE_JIT=true` (default).

### Option B — State dict
Save only the state dict:

```python
torch.save({"model_state_dict": model.state_dict()}, "model.pt")
```

Set `USE_JIT=false` and edit the marked section in `model.py` to reconstruct your architecture.

---

## Deploy to Render

1. Push this repo to GitHub (including `render.yaml` and `backend/`).
2. Go to [render.com](https://render.com) → **New → Blueprint** → connect your repo.
3. Render reads `render.yaml` automatically.
4. In the service dashboard, set the **`CORS_ORIGINS`** environment variable to your frontend URL (e.g. `https://your-app.netlify.app`).
5. Upload `model.pt`:  
   - In the Render dashboard → **Disks** tab, the disk is mounted at `/opt/render/project/src/backend`.  
   - Use the Render Shell (`render shell`) to copy the file:
     ```bash
     # From your local machine
     render shell --service <service-id>
     # Then inside the shell
     curl -L "https://your-signed-url-to-model.pt" -o model.pt
     ```
   - Alternatively, host `model.pt` on Supabase Storage or any CDN and download it at startup via a custom `build.sh` script.

6. After the first deploy, set the frontend env var:
   ```
   VITE_API_URL=https://dermalyze-api.onrender.com
   ```

> **Free tier note:** Render free services spin down after 15 minutes of inactivity. The first request after a cold start will take ~30–60 s while the model loads. Consider adding a keep-alive ping from the frontend, or upgrading to a paid instance for production use.

---

## Supabase setup

Run the SQL in `../supabase_setup.sql` in the Supabase SQL Editor, then:

1. Go to **Storage** → **New bucket** → name it `analysis-images` → set to **Private**.
2. The RLS policies in the SQL file already handle upload/read permissions per user.

---

## API reference

### `POST /classify`

**Request:** `multipart/form-data` with a field named `file` (JPEG / PNG / WebP, max 20 MB).

**Response:**
```json
{
  "classes": [
    { "id": "mel",   "name": "Melanoma",            "score": 67.40 },
    { "id": "nv",    "name": "Melanocytic Nevi",     "score": 18.20 },
    { "id": "bcc",   "name": "Basal Cell Carcinoma", "score":  7.10 },
    { "id": "bkl",   "name": "Benign Keratosis",     "score":  4.30 },
    { "id": "akiec", "name": "Actinic Keratosis",    "score":  1.80 },
    { "id": "df",    "name": "Dermatofibroma",       "score":  0.90 },
    { "id": "vasc",  "name": "Vascular Lesion",      "score":  0.30 }
  ]
}
```

Classes are sorted highest score first. Scores are percentages (sum ≈ 100).
