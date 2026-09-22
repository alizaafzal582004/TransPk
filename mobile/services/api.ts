// TransPk — Backend API Service
const BACKEND_URL = (process.env.EXPO_PUBLIC_BACKEND_URL || 'https://safarzubaan.onrender.com').replace(/\/$/, '');
const REQUEST_TIMEOUT_MS = 60_000;

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
      ? await response.json()
      : { detail: await response.text() };

    if (!response.ok) throw new Error(data.detail || `Request failed (${response.status})`);
    return data as T;
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      throw new Error('The server took too long to respond. Please try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

type TranslationResult = { translated_text: string; warning?: string };
type TranscriptionResult = { transcribed_text: string };

// TEXT TRANSLATION
export async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
) {
  return postJson<TranslationResult>('/translate', {
    text,
    source_language: sourceLanguage,
    target_language: targetLanguage,
  });
}

// AUDIO TRANSCRIPTION — base64 method (FormData ke bina)
export async function transcribeAudioBase64(
  base64Audio: string,
  languageCode: string
) {
  return postJson<TranscriptionResult>('/transcribe-base64', {
    audio_base64: base64Audio,
    language_code: languageCode,
  });
}
