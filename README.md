# SafarZuban — Multilingual Pakistan Translator

A mobile app that lets foreign tourists in Pakistan communicate with locals by translating between foreign languages and Pakistani regional languages — in text, voice, or a mix of both.

## Overview

SafarZuban helps two people who don't share a language communicate. A tourist speaks or types in their language, the app translates to a Pakistani language, and the local person can read or hear it — then reply back. The phone can be passed between both people using Conversation Mode.

## Features

- **Text to Text** — Type and translate between two languages
- **Voice to Text** — Speak, and see the translated text
- **Text to Voice** — Type, and hear the translation spoken
- **Voice to Voice** — Speak, and the translation is spoken back automatically
- **Conversation Mode** — Split-screen, pass-the-phone workflow for two people
- **Offline Phrasebook** — Common emergency and tourist phrases that work without internet
- **Online/Offline detection** — Live translation online, phrasebook offline
- **Support warnings** — Honest labels when a language has limited voice or translation support

## Architecture

```
Mobile App (Expo + React Native)
        |  HTTP (JSON / audio as base64)
        v
Backend (FastAPI + Uvicorn)
        |  HTTPS
        v
Groq Cloud (Whisper STT + LLM translation)

Text-to-Speech runs on the device (Expo Speech), not the backend.
```

## Tech Stack

- **Mobile:** Expo, React Native, TypeScript, React Navigation
- **Backend:** Python, FastAPI, Uvicorn
- **Translation:** Groq LLM (openai/gpt-oss-20b)
- **Speech-to-Text:** Groq Whisper (whisper-large-v3-turbo)
- **Text-to-Speech:** Device-native (Expo Speech)
- **Storage:** Local JSON config files (no database)

## Supported Languages

**Pakistani:** Urdu (full), Punjabi (partial), Pashto (limited), Sindhi (limited), Saraiki (beta), Balochi (beta)

**Foreign:** English, Chinese, Arabic, German, French, Spanish, Russian, Turkish, Korean, Japanese (all full)

Support status reflects real capability. Voice input/output is not available for every language, and warnings are shown when quality may vary.

## Project Structure

```
safaruzuban-mvp/
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI app + health endpoint
│   │   ├── config/languages.py
│   │   ├── routes/            # /translate, /transcribe-base64
│   │   ├── schemas/           # Request/response models
│   │   └── services/          # Groq client, translation, transcription
│   ├── .env                   # GROQ_API_KEY (not committed)
│   ├── .env.example
│   └── requirements.txt
├── mobile/
│   ├── App.tsx                # Navigation
│   ├── screens/               # All app screens
│   ├── components/            # Reusable UI (LanguagePicker, GlassCard)
│   ├── config/                # languages, theme, phrasebook
│   ├── services/              # api, connectivity
│   └── assets/                # Images
└── README.md
```

## Setup Instructions

### Backend

1. Open a terminal in the `backend` folder.
2. Create and activate a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install fastapi uvicorn python-dotenv groq python-multipart
   ```
4. Create a `.env` file (copy from `.env.example`) and add your Groq API key:
   ```
   GROQ_API_KEY=your_key_here
   ```
5. Run the server:
   ```
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
6. Verify at `http://localhost:8000/health`.

### Mobile

1. Open a terminal in the `mobile` folder.
2. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```
3. Update the backend URL in `services/api.ts` to your computer's local IP (e.g. `http://192.168.x.x:8000`).
4. Start the development server:
   ```
   npx expo start --dev-client
   ```
5. Open the SafarZuban development build on your Android device and connect.

## Environment Variables

| Variable       | Where          | Purpose                                     |
|----------------|----------------|---------------------------------------------|
| `GROQ_API_KEY` | `backend/.env` | Groq API access (never committed to Git)    |

## How to Run (Quick)

1. Start backend: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
2. Start mobile: `npx expo start --dev-client`
3. Connect phone (same WiFi as computer)

## Known Limitations

- Low-resource languages (Saraiki, Balochi) have limited or beta-level translation quality and no voice support.
- Punjabi translation may output Gurmukhi (Indian) script instead of Shahmukhi (Pakistani); TTS is not available.
- Voice input/output depends on the device's installed language voices.
- Live translation requires internet; only the phrasebook works offline.
- The phone and backend must be on the same WiFi network for local development.

## Security

- The Groq API key is stored only in `backend/.env` and never in the mobile app.
- `.env` is excluded from Git via `.gitignore`.
- All Groq calls happen on the backend; the mobile app never sees the key.

## Testing

Tested across all four modes for English ↔ Urdu, plus support-status verification for Punjabi, Pashto, Sindhi, Saraiki, and Balochi. Failure cases tested: offline mode, empty text, unsupported language, microphone permission, and no speech detected.

## Out of Scope (MVP)

Login/accounts, payments, custom-trained models, analytics, cloud sync, and app store submission are intentionally excluded from this MVP.

## Demo Flow

1. Open the app (onboarding on first launch).
2. Select English → Urdu.
3. Text translation.
4. Voice → Text.
5. Text → Voice.
6. Voice → Voice.
7. Conversation Mode (pass the phone).
8. Switch to Punjabi/Pashto to show support warnings.
9. Disable internet to show the Offline Phrasebook.