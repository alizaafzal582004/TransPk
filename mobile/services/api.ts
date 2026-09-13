// TransPk — Backend API Service
const BACKEND_URL = 'https://safarzubaan.onrender.com';

// TEXT TRANSLATION
export async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
) {
  const response = await fetch(`${BACKEND_URL}/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      source_language: sourceLanguage,
      target_language: targetLanguage,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || 'Translation failed');
  return data;
}

// AUDIO TRANSCRIPTION — base64 method (FormData ke bina)
export async function transcribeAudioBase64(
  base64Audio: string,
  languageCode: string
) {
  const response = await fetch(`${BACKEND_URL}/transcribe-base64`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      audio_base64: base64Audio,
      language_code: languageCode,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || 'Transcription failed');
  return data;
}