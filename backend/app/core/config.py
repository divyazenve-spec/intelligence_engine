"""Application settings via Pydantic-Settings (reads from .env automatically)."""
from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    secret_key: str = "dev-only-change-me"
    debug: bool = False
    mysql_database: str = "zenve_bi"
    mysql_user: str = "zenve"
    mysql_password: str = "zenve_password"
    mysql_host: str = "127.0.0.1"
    mysql_port: int = 3306

    # Where the compiled frontend lives (used when running standalone).
    # Default: two levels up from backend/ → zenve-bi/frontend
    frontend_dir: Path = Path(__file__).resolve().parents[3] / "frontend"

    @property
    def database_url(self) -> str:
        return (
            f"mysql://{self.mysql_user}:{self.mysql_password}"
            f"@{self.mysql_host}:{self.mysql_port}/{self.mysql_database}"
        )

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
