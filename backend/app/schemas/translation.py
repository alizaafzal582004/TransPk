from pydantic import BaseModel
from typing import Optional

class TranslationRequest(BaseModel):
    text: str
    source_language: str
    target_language: str

class TranslationResponse(BaseModel):
    original_text: str
    translated_text: str
    source_language: str
    target_language: str
    support_status: str
    warning: Optional[str] = None