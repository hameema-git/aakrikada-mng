@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install it from https://nodejs.org and run this file again.
  pause
  exit /b 1
)
start "Aakrikada KSMA website" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"
npm start
pause
