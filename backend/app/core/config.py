"""Application settings — reads from environment variables / .env file."""
import urllib.parse
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

    # MySQL connection configuration
    mysql_host: str = "127.0.0.1"
    mysql_port: int = 3306
    mysql_user: str = "root"
    mysql_password: str = "Vasanth@zenve"
    mysql_db: str = "zenve_engine"

    # SQLite fallback path if needed
    db_path: str = str(_BACKEND_DIR / "zenvebi.db")

    # Gemini / AI (optional)
    gemini_api_key: str = ""

    @property
    def database_url(self) -> str:
        # URL encode password to handle special characters like '@'
        encoded_pwd = urllib.parse.quote_plus(self.mysql_password)
        return (
            f"mysql+pymysql://{self.mysql_user}:{encoded_pwd}@"
            f"{self.mysql_host}:{self.mysql_port}/{self.mysql_db}?charset=utf8mb4"
        )

    @property
    def frontend_dir(self) -> Path:
        return _BACKEND_DIR.parent / "frontend"


settings = Settings()
