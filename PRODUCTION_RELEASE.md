# TransPk production release

The repository is configured to build an Android App Bundle with the local upload keystore referenced by `mobile/credentials.json`. The credential file and keystore are intentionally excluded from Git.

## Before the first Play upload

1. Confirm that `com.transpk.app` is the permanent package name.
2. Back up the keystore, alias, and passwords in an encrypted vault. Losing the upload key complicates future updates.
3. Sign in to the Expo account that owns project `729714f6-9fa5-4e9d-ac2d-d23a5b8efc88`:

   ```powershell
   cd mobile
   npx eas-cli login
   npx eas-cli credentials -p android
   ```

4. Build the signed production bundle:

   ```powershell
   npx eas-cli build --platform android --profile production
   ```

5. In Play Console, compare the bundle/upload certificate SHA-256 with **App integrity → Upload key certificate**. For a brand-new listing, enable Play App Signing during the first release.

## Required validation

Run these commands before every release:

```powershell
cd mobile
npm ci
npm run typecheck
npm run doctor
npm run export:android
```

Deploy the current `backend` before releasing the mobile bundle, then verify `/health`, typed translation, microphone denial, voice translation, offline mode, right-to-left text, and a cold backend start on physical Android devices. Upload the bundle to Internal testing and run the Play pre-launch report before Closed or Production testing.

## Play Console items that require account access

- Host the privacy policy on a public, non-editable HTTPS page. The in-app policy is in `mobile/screens/PrivacyScreen.tsx`; add the final developer/company name and support email to both versions.
- Complete Data Safety. Text, audio, and language selections are transmitted to the TransPk backend and Groq to provide app functionality. The app has no accounts, ads, analytics, or saved translation history in the current code.
- Complete the ads declaration, app access declaration, target audience, content rating, category, countries, contact details, and release notes.
- Upload a 512 × 512 Play icon (maximum 1 MB), a 1024 × 500 feature graphic, and phone screenshots.
- If the Play developer account is a personal account created after November 13, 2023, complete the required closed test before requesting production access.

## Backend environment

Configure these values in Render or the selected production host:

- `GROQ_API_KEY` — secret, never commit it.
- `CORS_ALLOW_ORIGINS` — comma-separated web origins; it may remain empty for an Android-only client.
- `MAX_REQUEST_BYTES=11000000`
- `RATE_LIMIT_REQUESTS=60`
- `RATE_LIMIT_WINDOW_SECONDS=60`

The app defaults to `https://safarzubaan.onrender.com`. Override it at build time with `EXPO_PUBLIC_BACKEND_URL` when the TransPk backend receives its final production domain.
