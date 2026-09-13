# TransPk — Central Language Configuration
# Nayi language add karni ho to sirf yahan ek entry add karo
# Support status real testing se verify kiya gaya hai

LANGUAGES = {

    # ==========================================
    # PAKISTANI LANGUAGES
    # ==========================================

    "ur": {
        "code": "ur",
        "name": "Urdu",
        "native_name": "اردو",
        "group": "pakistani",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,        # Android par aksar available
        "support_status": "full",
        "rtl": True,
        "whisper_code": "ur"
    },
    "pa": {
        "code": "pa",
        "name": "Punjabi",
        "native_name": "پنجابی",
        "group": "pakistani",
        "translation_supported": True,
        "stt_supported": True,        # Whisper tries, quality varies
        "tts_supported": False,       # Shahmukhi voice not available
        "support_status": "partial",
        "rtl": True,
        "whisper_code": "pa",
        "warning": "Punjabi (Shahmukhi) TTS not available. Text translation works."
    },
    "ps": {
        "code": "ps",
        "name": "Pashto",
        "native_name": "پښتو",
        "group": "pakistani",
        "translation_supported": True,
        "stt_supported": False,       # Whisper quality very poor
        "tts_supported": False,
        "support_status": "limited",
        "rtl": True,
        "whisper_code": "ps",
        "warning": "Pashto has limited support. Voice input/output not reliable."
    },
    "sd": {
        "code": "sd",
        "name": "Sindhi",
        "native_name": "سنڌي",
        "group": "pakistani",
        "translation_supported": True,
        "stt_supported": False,
        "tts_supported": False,
        "support_status": "limited",
        "rtl": True,
        "whisper_code": "sd",
        "warning": "Sindhi has limited support. Text translation only."
    },
    "skr": {
        "code": "skr",
        "name": "Saraiki",
        "native_name": "سرائیکی",
        "group": "pakistani",
        "translation_supported": True,  # Quality uncertain
        "stt_supported": False,
        "tts_supported": False,
        "support_status": "beta",
        "rtl": True,
        "whisper_code": None,
        "warning": "Saraiki is in beta. Translation quality may vary significantly."
    },
    "bal": {
        "code": "bal",
        "name": "Balochi",
        "native_name": "بلوچی",
        "group": "pakistani",
        "translation_supported": True,  # Quality very uncertain
        "stt_supported": False,
        "tts_supported": False,
        "support_status": "beta",
        "rtl": True,
        "whisper_code": None,
        "warning": "Balochi is in beta. Translation quality may vary significantly."
    },

    # ==========================================
    # FUTURE PAKISTANI (stretch)
    # ==========================================

    "hno": {
        "code": "hno",
        "name": "Hindko",
        "native_name": "ہندکو",
        "group": "pakistani_stretch",
        "translation_supported": False,
        "stt_supported": False,
        "tts_supported": False,
        "support_status": "unsupported",
        "rtl": True,
        "whisper_code": None,
        "warning": "Hindko is not yet supported."
    },

    # ==========================================
    # FOREIGN LANGUAGES
    # ==========================================

    "en": {
        "code": "en",
        "name": "English",
        "native_name": "English",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "en"
    },
    "zh": {
        "code": "zh",
        "name": "Chinese (Mandarin)",
        "native_name": "中文",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "zh"
    },
    "ar": {
        "code": "ar",
        "name": "Arabic",
        "native_name": "العربية",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": True,
        "whisper_code": "ar"
    },
    "de": {
        "code": "de",
        "name": "German",
        "native_name": "Deutsch",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "de"
    },
    "fr": {
        "code": "fr",
        "name": "French",
        "native_name": "Français",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "fr"
    },
    "es": {
        "code": "es",
        "name": "Spanish",
        "native_name": "Español",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "es"
    },
    "ru": {
        "code": "ru",
        "name": "Russian",
        "native_name": "Русский",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "ru"
    },
    "tr": {
        "code": "tr",
        "name": "Turkish",
        "native_name": "Türkçe",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "tr"
    },
    "ko": {
        "code": "ko",
        "name": "Korean",
        "native_name": "한국어",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "ko"
    },
    "ja": {
        "code": "ja",
        "name": "Japanese",
        "native_name": "日本語",
        "group": "foreign",
        "translation_supported": True,
        "stt_supported": True,
        "tts_supported": True,
        "support_status": "full",
        "rtl": False,
        "whisper_code": "ja"
    },
}

def get_language(code: str):
    """Language code se language info lo"""
    return LANGUAGES.get(code)

def is_translation_supported(code: str) -> bool:
    lang = LANGUAGES.get(code)
    return lang["translation_supported"] if lang else False

def is_stt_supported(code: str) -> bool:
    lang = LANGUAGES.get(code)
    return lang["stt_supported"] if lang else False

def is_tts_supported(code: str) -> bool:
    lang = LANGUAGES.get(code)
    return lang["tts_supported"] if lang else False

def get_support_status(code: str) -> str:
    lang = LANGUAGES.get(code)
    return lang["support_status"] if lang else "unsupported"

def get_warning(code: str) -> str:
    lang = LANGUAGES.get(code)
    return lang.get("warning", "") if lang else ""