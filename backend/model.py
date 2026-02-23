"""
model.py — Load a HAM10000-trained PyTorch model and run inference.

Expects either:
  - A TorchScript model saved with torch.jit.save()   → loaded with torch.jit.load()
  - A plain state-dict checkpoint saved with torch.save() → loaded with torch.load()
    (set USE_JIT=false in environment to use state-dict mode)

Place your .pt file at the path specified by MODEL_PATH (default: ./model.pt)
"""

import os
import io
from typing import List

import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image

# ── Class labels (HAM10000 order) ────────────────────────────────────────────
CLASS_IDS = ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"]
CLASS_NAMES = [
    "Actinic Keratosis",
    "Basal Cell Carcinoma",
    "Benign Keratosis",
    "Dermatofibroma",
    "Melanoma",
    "Melanocytic Nevi",
    "Vascular Lesion",
]

# ── Preprocessing pipeline (ImageNet statistics, 224×224) ────────────────────
_preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225],
    ),
])

# ── Model loading ─────────────────────────────────────────────────────────────
_MODEL_PATH = os.environ.get("MODEL_PATH", "./model.pt")
_USE_JIT = os.environ.get("USE_JIT", "true").lower() != "false"

_model = None  # lazy-loaded on first request


def _load_model() -> torch.nn.Module:
    global _model
    if _model is not None:
        return _model

    if not os.path.exists(_MODEL_PATH):
        raise FileNotFoundError(
            f"Model file not found at '{_MODEL_PATH}'. "
            "Set the MODEL_PATH environment variable to the correct path."
        )

    if _USE_JIT:
        _model = torch.jit.load(_MODEL_PATH, map_location="cpu")
    else:
        # If you saved only the state dict you must reconstruct the architecture here.
        # Replace the import and model instantiation below with your own architecture.
        # Example using a ResNet-50 fine-tuned on HAM10000:
        #
        # from torchvision.models import resnet50
        # checkpoint = torch.load(_MODEL_PATH, map_location="cpu", weights_only=True)
        # _model = resnet50(num_classes=7)
        # _model.load_state_dict(checkpoint["model_state_dict"])
        raise NotImplementedError(
            "State-dict mode requires you to define the model architecture in model.py. "
            "See the comment block above this line."
        )

    _model.eval()
    return _model


# ── Public inference function ─────────────────────────────────────────────────
def classify(image_bytes: bytes) -> List[dict]:
    """
    Run inference on raw image bytes.

    Returns a list of 7 dicts sorted by score descending:
        [{"id": "mel", "name": "Melanoma", "score": 67.4}, ...]
    """
    model = _load_model()

    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = _preprocess(img).unsqueeze(0)  # shape: [1, 3, 224, 224]

    with torch.no_grad():
        logits = model(tensor)
        probs = F.softmax(logits, dim=1).squeeze(0)  # shape: [7]

    results = [
        {
            "id": CLASS_IDS[i],
            "name": CLASS_NAMES[i],
            "score": round(float(probs[i]) * 100, 2),
        }
        for i in range(len(CLASS_IDS))
    ]

    results.sort(key=lambda x: x["score"], reverse=True)
    return results
