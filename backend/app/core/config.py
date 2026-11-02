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

    # MySQL connection configuration (Zenve Main Destination)
    mysql_host: str = "127.0.0.1"
    mysql_port: int = 3307
    mysql_user: str = "zenve_main_user"
    mysql_password: str = "zenvemain-123"
    mysql_db: str = "zenve_main"

    # Zippy Main CRM Source Database (D:\New folder\new zippy crm\zippy-main-main-main)
    zippy_host: str = "127.0.0.1"
    zippy_port: int = 3307
    zippy_user: str = "zippy_crm_app"
    zippy_password: str = "zippy-123"
    zippy_db: str = "zippy_crm"

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
    def zippy_database_url(self) -> str:
        encoded_pwd = urllib.parse.quote_plus(self.zippy_password)
        return (
            f"mysql+pymysql://{self.zippy_user}:{encoded_pwd}@"
            f"{self.zippy_host}:{self.zippy_port}/{self.zippy_db}?charset=utf8mb4"
        )

    @property
    def vetcare_database_url(self) -> str:
        encoded_pwd = urllib.parse.quote_plus(self.mysql_password)
        return (
            f"mysql+pymysql://{self.mysql_user}:{encoded_pwd}@"
            f"{self.mysql_host}:{self.mysql_port}/vetcare?charset=utf8mb4"
        )

    @property
    def doctortest_database_url(self) -> str:
        encoded_pwd = urllib.parse.quote_plus(self.mysql_password)
        return (
            f"mysql+pymysql://{self.mysql_user}:{encoded_pwd}@"
            f"{self.mysql_host}:{self.mysql_port}/doctortest?charset=utf8mb4"
        )

    @property
    def frontend_dir(self) -> Path:
        return _BACKEND_DIR.parent / "frontend"


settings = Settings()
