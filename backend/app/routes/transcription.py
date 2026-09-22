# TransPk — Transcription Route
import os
import base64
import tempfile
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.schemas.transcription import TranscriptionResponse
from app.services.transcription_service import transcribe_audio
from app.config.languages import get_language

router = APIRouter()
logger = logging.getLogger(__name__)

MAX_BASE64_LENGTH = 10_000_000
MAX_AUDIO_BYTES = 7_500_000

class Base64AudioRequest(BaseModel):
    audio_base64: str = Field(min_length=1, max_length=MAX_BASE64_LENGTH)
    language_code: str = Field(default="en", min_length=2, max_length=10)

@router.post("/transcribe-base64", response_model=TranscriptionResponse)
def transcribe_base64(request: Base64AudioRequest):
    # Language check
    lang = get_language(request.language_code)
    if lang and not lang["stt_supported"]:
        raise HTTPException(
            status_code=400,
            detail=f"Voice input not supported for {lang['name']}."
        )

    # Base64 → audio file
    try:
        audio_bytes = base64.b64decode(request.audio_base64, validate=True)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid audio data")

    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Audio recording is empty")
    if len(audio_bytes) > MAX_AUDIO_BYTES:
        raise HTTPException(status_code=413, detail="Audio recording is too large")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".m4a") as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name

    try:
        result = transcribe_audio(
            audio_file_path=tmp_path,
            language_code=request.language_code
        )
        return result
    except Exception:
        logger.exception("Audio transcription failed")
        raise HTTPException(status_code=502, detail="Transcription service is temporarily unavailable")
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
