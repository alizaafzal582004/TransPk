# SafarZuban Backend — main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime

from app.routes.translation import router as translation_router
from app.routes.transcription import router as transcription_router

app = FastAPI(
    title="SafarZuban API",
    description="Multilingual Pakistan Translator Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translation_router)
app.include_router(transcription_router)

@app.get("/")
def root():
    return {"app": "SafarZuban API", "status": "running", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": "SafarZuban API",
        "version": "1.0.0",
        "timestamp": datetime.datetime.now().isoformat()
    }



# Render/hosting ke liye — dynamic port
if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)