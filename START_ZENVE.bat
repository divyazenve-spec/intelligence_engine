@echo off
title Zenve BI - Full Platform Startup
color 0A
echo.
echo  ====================================================
echo    ZENVE BI PLATFORM - Starting All Services
echo  ====================================================
echo.
echo  [1/2] Starting Backend (FastAPI) on port 8000...
echo  [2/2] Starting Frontend (Vite Dev) on port 3001...
echo.
echo  After startup, open your browser and go to:
echo.
echo    >>> http://localhost:3001  <<<   (Main App)
echo.
echo  Press Ctrl+C to stop all servers.
echo  ====================================================
echo.

:: Start backend in a new window
start "Zenve Backend (FastAPI :8000)" cmd /k "cd /d "%~dp0backend" && python -m uvicorn app.main:app --reload --port 8000 --host 127.0.0.1"

:: Wait 2 seconds for backend to start
timeout /t 2 /nobreak >nul

:: Start frontend in a new window
start "Zenve Frontend (Vite :3001)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo  Both servers are starting in separate windows.
echo  Wait ~5 seconds, then open:  http://localhost:3001
echo.
pause
