// TransPk — Mobile Language Config
export interface Language {
  code: string;
  name: string;
  native_name: string;
  flag: string;
  group: string;
  translation_supported: boolean;
  stt_supported: boolean;
  tts_supported: boolean;
  support_status: string;
  rtl: boolean;
  warning?: string;
}

export const LANGUAGES: Language[] = [
  // Pakistani
  { code: "ur", name: "Urdu", native_name: "اردو", flag: "🇵🇰", group: "pakistani", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: true },
  { code: "pa", name: "Punjabi", native_name: "پنجابی", flag: "🇵🇰", group: "pakistani", translation_supported: true, stt_supported: true, tts_supported: false, support_status: "partial", rtl: true, warning: "Punjabi TTS not available. Text works." },
  { code: "ps", name: "Pashto", native_name: "پښتو", flag: "🇵🇰", group: "pakistani", translation_supported: true, stt_supported: false, tts_supported: false, support_status: "limited", rtl: true, warning: "Pashto has limited support." },
  { code: "sd", name: "Sindhi", native_name: "سنڌي", flag: "🇵🇰", group: "pakistani", translation_supported: true, stt_supported: false, tts_supported: false, support_status: "limited", rtl: true, warning: "Sindhi has limited support." },
  { code: "skr", name: "Saraiki", native_name: "سرائیکی", flag: "🇵🇰", group: "pakistani", translation_supported: true, stt_supported: false, tts_supported: false, support_status: "beta", rtl: true, warning: "Saraiki is in beta." },
  { code: "bal", name: "Balochi", native_name: "بلوچی", flag: "🇵🇰", group: "pakistani", translation_supported: true, stt_supported: false, tts_supported: false, support_status: "beta", rtl: true, warning: "Balochi is in beta." },
  // Foreign
  { code: "en", name: "English", native_name: "English", flag: "🇬🇧", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
  { code: "zh", name: "Chinese", native_name: "中文", flag: "🇨🇳", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
  { code: "ar", name: "Arabic", native_name: "العربية", flag: "🇸🇦", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: true },
  { code: "de", name: "German", native_name: "Deutsch", flag: "🇩🇪", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
  { code: "fr", name: "French", native_name: "Français", flag: "🇫🇷", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
  { code: "es", name: "Spanish", native_name: "Español", flag: "🇪🇸", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
  { code: "ru", name: "Russian", native_name: "Русский", flag: "🇷🇺", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
  { code: "tr", name: "Turkish", native_name: "Türkçe", flag: "🇹🇷", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
  { code: "ko", name: "Korean", native_name: "한국어", flag: "🇰🇷", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
  { code: "ja", name: "Japanese", native_name: "日本語", flag: "🇯🇵", group: "foreign", translation_supported: true, stt_supported: true, tts_supported: true, support_status: "full", rtl: false },
];

export function getLanguage(code: string): Language | undefined {
  return LANGUAGES.find((l) => l.code === code);
}