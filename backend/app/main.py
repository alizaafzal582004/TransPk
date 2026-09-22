# TransPk Backend — main.py
from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from collections import defaultdict, deque
from datetime import datetime, timezone
import asyncio
import os
import time

from app.routes.translation import router as translation_router
from app.routes.transcription import router as transcription_router

APP_NAME = "TransPk API"
MAX_REQUEST_BYTES = int(os.getenv("MAX_REQUEST_BYTES", "11000000"))
RATE_LIMIT_REQUESTS = int(os.getenv("RATE_LIMIT_REQUESTS", "60"))
RATE_LIMIT_WINDOW_SECONDS = int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "60"))
cors_origins = [origin.strip() for origin in os.getenv("CORS_ALLOW_ORIGINS", "").split(",") if origin.strip()]
request_times: dict[str, deque[float]] = defaultdict(deque)
rate_limit_lock = asyncio.Lock()

app = FastAPI(
    title=APP_NAME,
    description="Multilingual Pakistan Translator Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def protect_public_api(request: Request, call_next):
    if request.method == "POST":
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                if int(content_length) > MAX_REQUEST_BYTES:
                    return JSONResponse(status_code=413, content={"detail": "Request body is too large"})
            except ValueError:
                return JSONResponse(status_code=400, content={"detail": "Invalid Content-Length header"})

        client_ip = request.client.host if request.client else "unknown"
        now = time.monotonic()

        async with rate_limit_lock:
            timestamps = request_times[client_ip]
            cutoff = now - RATE_LIMIT_WINDOW_SECONDS
            while timestamps and timestamps[0] < cutoff:
                timestamps.popleft()
            if len(timestamps) >= RATE_LIMIT_REQUESTS:
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Too many requests. Please try again shortly."},
                    headers={"Retry-After": str(RATE_LIMIT_WINDOW_SECONDS)},
                )
            timestamps.append(now)

    return await call_next(request)

app.include_router(translation_router)
app.include_router(transcription_router)

@app.get("/")
def root():
    return {"app": APP_NAME, "status": "running", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": APP_NAME,
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }



# Render/hosting ke liye — dynamic port
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
