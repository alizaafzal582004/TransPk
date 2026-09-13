# SafarZuban — Translation Service
from app.services.groq_client import client, CHAT_MODEL

def translate_text(text: str, source_language: str, target_language: str) -> dict:
    """
    Text translate karo source se target language mein.
    Groq LLM ko tight prompt dete hain — sirf translation chahiye, explanation nahi.
    """

    prompt = f"""You are a professional translator.
Translate the following text from {source_language} to {target_language}.

Rules:
- Return ONLY the translated text
- No explanations, no notes, no alternatives
- Preserve the original meaning exactly
- Use the correct script for the target language
- Do not add any commentary

Text to translate:
{text}"""

    response = client.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens=1000,
        temperature=0.1  # Low temperature = consistent translations
    )

    translated = response.choices[0].message.content.strip()

    return {
        "original_text": text,
        "translated_text": translated,
        "source_language": source_language,
        "target_language": target_language,
        "support_status": "full"
    }