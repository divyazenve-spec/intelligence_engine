"""Application settings — reads from environment variables / .env file."""
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# Backend root: backend/
_BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=_BACKEND_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # SQLite database path (relative to backend dir)
    db_path: str = str(_BACKEND_DIR / "zenvebi.db")

    # Gemini / AI (optional)
    gemini_api_key: str = ""

    @property
    def database_url(self) -> str:
        return f"sqlite:///{self.db_path}"

    @property
    def frontend_dir(self) -> Path:
        return _BACKEND_DIR.parent / "frontend"


settings = Settings()
