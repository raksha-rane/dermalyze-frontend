# Dermalyze

An AI-assisted skin lesion classification system designed as a clinical decision support tool for dermatologists and medical professionals.

## Overview

Dermalyze allows users to upload dermoscopic images and receive AI-powered classification results across 7 skin lesion categories:

| Abbreviation | Condition |
|---|---|
| **akiec** | Actinic keratoses and intraepithelial carcinoma |
| **bcc** | Basal cell carcinoma |
| **bkl** | Benign keratosis-like lesions |
| **df** | Dermatofibroma |
| **mel** | Melanoma |
| **nv** | Melanocytic nevi |
| **vasc** | Vascular lesions |

## Features

- **User Authentication** — Login, signup, and password recovery flows
- **Image Upload** — Upload dermoscopic skin images for analysis
- **AI Classification** — Get probability scores across 7 lesion classes
- **Analysis History** — Review past classification results
- **Responsive UI** — Clean, mobile-friendly interface built with Tailwind CSS


## Getting Started


### Installation

```bash
git clone https://github.com/raksha-rane/dermalyze-frontend.git
cd dermalyze-frontend
npm install
```

### Configuration

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Set at least:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For inference API:

```env
# Deployed backend URL (recommended for production frontend)
VITE_API_URL=https://your-backend-domain.com
```

Local dev fallback:

- If `VITE_API_URL` is not set, frontend calls `/api`.
- Vite proxies `/api/*` to `http://localhost:8000` by default.
- Override local backend target with:

```bash
BACKEND_URL=http://localhost:9000 npm run dev
```




### Run

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

