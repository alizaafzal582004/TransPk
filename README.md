# TransPk 🇵🇰 — Multilingual Pakistan Translator

> **Breaking language barriers between tourists and locals in Pakistan — through text, voice, and real-time conversation.**

[![React Native](https://img.shields.io/badge/React%20Native-Expo-61DAFB?logo=react\&logoColor=white)](https://reactnative.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi\&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python\&logoColor=white)](https://www.python.org/)
[![Groq](https://img.shields.io/badge/AI-Groq%20Cloud-orange)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MVP%20Prototype-lightgrey)](#license)

**TransPk** is an AI-powered multilingual translation app designed to help foreign tourists communicate with local communities across Pakistan. It translates text and speech between international languages and Pakistani regional languages, including Urdu, Punjabi, Pashto, Sindhi, Saraiki, and Balochi.

Unlike a conventional translation app, TransPk is designed around a real-world interaction: **two people, one phone, and a language barrier that needs to disappear.**

[Explore the project](#-demo) • [Architecture](#-system-architecture) • [Run locally](#-getting-started) • [Technical challenges](#-engineering-highlights)

---

## 🚀 Why TransPk?

Pakistan welcomes travelers from around the world, but communication can become difficult when tourists and local communities do not share a common language.

TransPk addresses this challenge with a practical, mobile-first translation experience:

* Tourists can speak or type in their own language.
* Locals can read or listen to the translated message.
* Both people can take turns using **Conversation Mode**.
* Common travel and emergency phrases remain accessible without internet.
* Language support is presented honestly, including limitations for low-resource languages.

The project demonstrates how modern AI, speech recognition, and mobile development can be combined into a useful product for a specific regional problem.

## ✨ Key Features

### 1. Multimodal translation

| Mode          | What it does                                          |
| ------------- | ----------------------------------------------------- |
| Text → Text   | Translate typed messages between supported languages. |
| Voice → Text  | Record speech and display the translated text.        |
| Text → Voice  | Type a message and hear the translation.              |
| Voice → Voice | Speak, translate, and hear the result automatically.  |

### 2. Conversation Mode

A two-person, pass-the-phone workflow for natural communication.

1. Person A selects their language and speaks or types.
2. TransPk translates the message into Person B's language.
3. Person B reads or listens to the result.
4. The phone is passed back, and the conversation continues.

This makes the app useful for directions, transportation, hotels, shopping, restaurants, and everyday interactions.

### 3. Pakistani regional language support

TransPk prioritizes languages that matter to communication across Pakistan.

* **Urdu:** Full support.
* **Punjabi:** Partial support.
* **Pashto:** Limited support.
* **Sindhi:** Limited support.
* **Saraiki:** Beta.
* **Balochi:** Beta.

International languages include English, Chinese, Arabic, German, French, Spanish, Russian, Turkish, Korean, and Japanese.

Support labels are part of the product design. They communicate that translation quality and speech capabilities vary across languages rather than presenting every language as equally capable.

### 4. Offline Phrasebook

Access common tourist and emergency phrases without an internet connection.

The phrasebook is useful for situations such as:

* Asking for directions.
* Finding accommodation.
* Ordering food.
* Requesting help.
* Communicating basic emergency needs.

### 5. Online/offline awareness

TransPk distinguishes between live AI translation and offline phrasebook access.

* **Online:** Text translation and speech transcription through the backend.
* **Offline:** Predefined phrasebook content remains available.
* **Support warnings:** Users are informed when language or voice capabilities are limited.

### 6. Native text-to-speech

Text-to-speech runs directly on the mobile device using Expo Speech. The backend does not need to generate or stream audio for speech output.

This keeps the architecture simpler and makes speech playback dependent on the device's installed voices.

---

## 🧠 System Architecture

```text
┌──────────────────────────────────────────────┐
│              MOBILE APPLICATION              │
│              Expo + React Native              │
│                TypeScript                    │
│                                              │
│  Language Picker · Translation UI            │
│  Conversation Mode · Voice Recording         │
│  Offline Phrasebook · Connectivity Status    │
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTP / JSON
                       │ Audio as Base64
                       ▼
┌──────────────────────────────────────────────┐
│                  BACKEND                     │
│             FastAPI + Uvicorn                │
│                                              │
│  API Routes · Validation · Services          │
│  Groq Client · Translation · Transcription   │
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTPS
                       ▼
┌──────────────────────────────────────────────┐
│                  GROQ CLOUD                  │
│                                              │
│  Whisper large-v3-turbo — Speech-to-Text     │
│  openai/gpt-oss-20b — Translation             │
└──────────────────────────────────────────────┘

          Text-to-Speech
       Runs on the device
          via Expo Speech
```

### Translation pipeline

```text
User speaks or types
        │
        ▼
Mobile app captures input
        │
        ▼
FastAPI backend
        │
        ├── Text input ────────┐
        │                      │
        └── Audio input        │
                │              │
                ▼              │
         Groq Whisper          │
         Speech-to-Text        │
                │              │
                └──────┬───────┘
                       ▼
                 Groq LLM
                 Translation
                       │
                       ▼
                Translated text
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
       Display text       Expo Speech
                           Voice output
```

---

## 🛠️ Tech Stack

### Mobile

* **Expo + React Native** — Cross-platform mobile development.
* **TypeScript** — Type-safe application code.
* **React Navigation** — Screen navigation and app flow.
* **Expo Speech** — Device-native text-to-speech.
* **Local JSON configuration** — Language metadata, theme, and phrasebook content.

### Backend

* **Python** — Backend and AI integration.
* **FastAPI** — Lightweight, typed REST API.
* **Uvicorn** — ASGI application server.
* **Groq Python SDK** — AI model integration.
* **python-dotenv** — Environment configuration.
* **python-multipart** — Multipart request support.

### AI Models

| Capability     | Technology                           |
| -------------- | ------------------------------------ |
| Translation    | Groq-hosted `openai/gpt-oss-20b`     |
| Speech-to-Text | Groq-hosted `whisper-large-v3-turbo` |
| Text-to-Speech | Expo Speech / device-native voices   |

---

## 📁 Project Structure

```text
safaruzuban-mvp/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config/
│   │   │   └── languages.py
│   │   ├── routes/
│   │   │   ├── translate.py
│   │   │   └── transcribe.py
│   │   ├── schemas/
│   │   └── services/
│   │       ├── groq_client.py
│   │       ├── translation.py
│   │       └── transcription.py
│   ├── .env
│   ├── .env.example
│   └── requirements.txt
│
├── mobile/
│   ├── App.tsx
│   ├── screens/
│   ├── components/
│   │   ├── LanguagePicker.tsx
│   │   └── GlassCard.tsx
│   ├── config/
│   │   ├── languages.ts
│   │   ├── theme.ts
│   │   └── phrasebook.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── connectivity.ts
│   └── assets/
│
└── README.md
```

---

## 🧩 API Overview

The backend exposes endpoints for translation, transcription, and service health.

| Endpoint             | Method | Purpose                                     |
| -------------------- | ------ | ------------------------------------------- |
| `/health`            | GET    | Check backend availability.                 |
| `/translate`         | POST   | Translate text between supported languages. |
| `/transcribe-base64` | POST   | Transcribe Base64-encoded audio.            |

The mobile app communicates with the backend over HTTP during local development. The backend handles communication with Groq, keeping the API key out of the mobile application.

---

## 🏁 Getting Started

### Prerequisites

* Python 3.10 or newer.
* Node.js and npm.
* Expo development environment.
* Android device or emulator.
* A Groq API key.
* A computer and mobile device connected to the same Wi-Fi network for local development.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/safaruzuban-mvp.git
cd safaruzuban-mvp
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Configure the backend

```bash
cd backend

python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

If you are setting up the dependencies manually:

```bash
pip install fastapi uvicorn python-dotenv groq python-multipart
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Never commit your real API key.

### 3. Start the backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Verify that the backend is running:

```text
http://localhost:8000/health
```

### 4. Configure the mobile app

Open a second terminal:

```bash
cd mobile
npm install --legacy-peer-deps
```

Update the backend URL in `mobile/services/api.ts` to your computer's local network IP address:

```typescript
const API_BASE_URL = "http://192.168.x.x:8000";
```

Use your computer's actual local IP address. Do not use `localhost` when accessing the backend from a physical phone.

### 5. Start Expo

```bash
npx expo start --dev-client
```

Open the TransPk development build on your Android device and connect to the development server.

---

## 🔐 Security

Security considerations are built into the MVP architecture.

* The Groq API key is stored in `backend/.env`.
* The mobile app never receives the Groq API key.
* All Groq API calls are made by the backend.
* `.env` is excluded from version control through `.gitignore`.
* No user account or database is required for this prototype.

**Production consideration:** Before public deployment, HTTPS, authentication or rate limiting, secure secret management, request validation, and privacy controls should be added as appropriate.

---

## 🧪 Testing

The MVP has been tested across the four translation modes for English ↔ Urdu.

Additional verification includes:

* Language support status for Punjabi, Pashto, Sindhi, Saraiki, and Balochi.
* Offline mode and phrasebook behavior.
* Empty text handling.
* Unsupported language handling.
* Microphone permission scenarios.
* No-speech-detected scenarios.

These tests help verify the core translation flow and the user-facing failure cases that matter in a real travel application.

---

## ⚠️ Known Limitations

TransPk is an MVP, and its limitations are documented intentionally.

| Area                | Current limitation                                                                 |
| ------------------- | ---------------------------------------------------------------------------------- |
| Saraiki and Balochi | Beta-level translation quality; voice support is unavailable.                      |
| Punjabi             | Translation may produce Gurmukhi rather than Shahmukhi script; TTS is unavailable. |
| Pashto and Sindhi   | Limited translation and/or speech capabilities.                                    |
| Voice features      | Quality and availability depend on the installed device language voices.           |
| Live translation    | Requires internet access and a running backend.                                    |
| Local development   | Phone and backend must be on the same Wi-Fi network.                               |

The app does not claim equal accuracy across all supported languages. Regional language support is an ongoing engineering and evaluation challenge.

---

## 🎬 Demo

Suggested demo flow for reviewers, recruiters, and contributors:

1. Launch TransPk and complete onboarding.
2. Select English → Urdu.
3. Demonstrate Text → Text translation.
4. Demonstrate Voice → Text.
5. Demonstrate Text → Voice.
6. Demonstrate Voice → Voice.
7. Use Conversation Mode with two people.
8. Switch to Punjabi or Pashto to demonstrate support warnings.
9. Disable internet and open the Offline Phrasebook.

> **Add a short screen recording or app screenshots here.** A working demo is the fastest way for a recruiter to understand the product.

<!-- Suggested assets:
![TransPk App Preview](assets/screenshots/app-preview.png)
![Conversation Mode](assets/screenshots/conversation-mode.png)
-->

---

## 💡 Engineering Highlights

TransPk is more than a basic translation API wrapper. The project explores several practical engineering problems:

### Multimodal AI integration

Combines speech recognition, LLM-based translation, and device-native speech synthesis into a single mobile workflow.

### Mobile–backend architecture

Separates the mobile interface from AI services using a FastAPI backend and structured JSON communication.

### Regional language awareness

Treats Urdu and other Pakistani languages as first-class product requirements, with explicit support levels rather than generic language lists.

### Resilient user experience

Handles offline access, missing speech, permissions, unsupported languages, and connectivity issues.

### Secure API integration

Keeps cloud credentials on the backend instead of exposing them in the mobile application.

### Product-oriented design

Conversation Mode and the offline phrasebook are designed around real-world tourist–local interactions, not just isolated translation requests.

---

## 🗺️ Future Roadmap

Potential improvements for future versions:

* [ ] Improve Shahmukhi Punjabi translation and script consistency.
* [ ] Evaluate and improve Saraiki and Balochi translation quality.
* [ ] Add more comprehensive offline language packs.
* [ ] Improve regional-language speech recognition.
* [ ] Add conversation history stored locally on the device.
* [ ] Introduce automated translation-quality evaluation.
* [ ] Add backend deployment for remote access.
* [ ] Add automated unit and integration tests.
* [ ] Improve accessibility and multilingual UI support.
* [ ] Explore on-device or hybrid translation for selected languages.

---

## 🎯 Project Goals

TransPk aims to demonstrate how AI/ML engineering can solve a meaningful communication problem through a complete product:

**Research → AI integration → Backend engineering → Mobile development → User experience → Testing**

The project is especially focused on the practical challenges of multilingual communication in Pakistan, including low-resource languages, voice support, and reliable behavior in real-world conditions.

---

## 📌 MVP Scope

The current MVP intentionally excludes:

* User accounts and authentication.
* Payments and subscriptions.
* Custom-trained translation models.
* Analytics and cloud synchronization.
* App Store or Google Play production submission.

These features can be considered after validating the core translation experience.

---

## 📄 License

This project is currently an MVP prototype. Add an appropriate open-source license before distributing the repository publicly.

---

## 🔎 SEO Keywords

AI translation app, multilingual translator, Pakistan translator, Pakistani regional languages, Urdu translator, Punjabi translator, Pashto translator, Sindhi translator, Saraiki translator, Balochi translator, tourist communication app, voice translation, speech-to-text, text-to-speech, voice-to-voice translation, React Native translation app, Expo mobile app, FastAPI AI backend, Groq API, Whisper speech recognition, LLM translation, Python AI project, AI/ML engineering project, multilingual communication, offline phrasebook.

**Built with AI, mobile engineering, and a focus on making communication easier across Pakistan.** 🇵🇰
