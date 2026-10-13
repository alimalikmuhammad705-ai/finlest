@echo off
title King Agency - Production Server
echo ===================================================
echo   King Agency - Production Build and Server
echo ===================================================
echo.

cd /d "%~dp0"

IF NOT EXIST ".env.local" (
    copy .env.example .env.local >nul
)

IF NOT EXIST "node_modules" (
    echo [Installing dependencies...]
    call npm install
)

echo [Building production application...]
call npm run build

echo.
echo [Starting production server on http://localhost:3000...]
call npm start
pause
