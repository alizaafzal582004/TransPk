# TransPk — Transcription Service
# Groq Whisper se audio → text
import os
from app.services.groq_client import client, WHISPER_MODEL

def transcribe_audio(audio_file_path: str, language_code: str = None) -> dict:
    """
    Audio file ko text mein convert karo Groq Whisper se.
    language_code: ISO code jaise 'en', 'ur' — accuracy badhti hai
    """
    with open(audio_file_path, 'rb') as audio_file:
        # Whisper ko bhejo
        params = {
            "file": (os.path.basename(audio_file_path), audio_file, "audio/m4a"),
            "model": WHISPER_MODEL,
            "response_format": "json",
            "temperature": 0.0,
        }

        # Language hint dena accuracy badhata hai
        if language_code and language_code not in ['skr', 'bal', 'hno']:
            params["language"] = language_code

        transcription = client.audio.transcriptions.create(**params)

    return {
        "transcribed_text": transcription.text,
        "language_code": language_code or "auto"
    }