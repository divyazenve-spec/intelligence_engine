@echo off
title Zenve BI Backend Server (FastAPI)
echo ===================================================
echo   Zenve BI Platform - Starting FastAPI Backend
echo   URL: http://127.0.0.1:8000
echo   Docs: http://127.0.0.1:8000/api/docs
echo ===================================================
cd /d "%~dp0"
python -m uvicorn app.main:app --reload --port 8000 --host 127.0.0.1
pause
