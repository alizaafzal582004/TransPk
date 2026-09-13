# TransPk — Transcription Route
import os
import base64
import tempfile
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.schemas.transcription import TranscriptionResponse
from app.services.transcription_service import transcribe_audio
from app.config.languages import get_language

router = APIRouter()

class Base64AudioRequest(BaseModel):
    audio_base64: str
    language_code: str = "en"

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
        audio_bytes = base64.b64decode(request.audio_base64)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid audio data")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".m4a") as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name

    try:
        result = transcribe_audio(
            audio_file_path=tmp_path,
            language_code=request.language_code
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)