# TransPk — Transcription Schema
from pydantic import BaseModel
from typing import Optional

class TranscriptionResponse(BaseModel):
    transcribed_text: str
    language_code: str
    translated_text: Optional[str] = None