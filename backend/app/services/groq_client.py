# TransPk — Groq Client
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Translation ke liye model
CHAT_MODEL = "openai/gpt-oss-20b"

# STT ke liye model
WHISPER_MODEL = "whisper-large-v3-turbo"