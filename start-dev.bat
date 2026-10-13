@echo off
title King Agency - Development Server
echo ===================================================
echo   King Agency - Customs Clearing Agent #1064
echo   Starting Local Development Environment...
echo ===================================================
echo.

cd /d "%~dp0"

IF NOT EXIST ".env.local" (
    echo [.env.local not found - copying default .env.example...]
    copy .env.example .env.local >nul
)

IF NOT EXIST "node_modules" (
    echo [Dependencies not found - installing node_modules...]
    call npm install
)

echo.
echo Starting Next.js server on http://localhost:3000...
echo Press Ctrl+C anytime to stop the server.
echo.

call npm run dev
pause
