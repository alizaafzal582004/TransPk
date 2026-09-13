# SafarZuban — Translation Route (with language validation)
from fastapi import APIRouter, HTTPException
from app.schemas.translation import TranslationRequest, TranslationResponse
from app.services.translation_service import translate_text
from app.config.languages import get_language, get_support_status, get_warning

router = APIRouter()

@router.post("/translate", response_model=TranslationResponse)
def translate(request: TranslationRequest):

    # Empty text check
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    # Length check
    if len(request.text) > 2000:
        raise HTTPException(status_code=400, detail="Text too long (max 2000 characters)")

    # Language support check
    source_lang = get_language(request.source_language)
    target_lang = get_language(request.target_language)

    if not source_lang or not target_lang:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language code. Use codes like 'en', 'ur', 'pa', etc."
        )

    if not source_lang["translation_supported"]:
        raise HTTPException(
            status_code=400,
            detail=f"Translation not supported for {source_lang['name']}"
        )

    # Get support status + warning
    support_status = get_support_status(request.target_language)
    warning = get_warning(request.target_language)

    try:
        result = translate_text(
            text=request.text,
            source_language=source_lang["name"],
            target_language=target_lang["name"]
        )
        # Support status aur warning add karein
        result["support_status"] = support_status
        if warning:
            result["warning"] = warning

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Translation failed. Please try again."
        )