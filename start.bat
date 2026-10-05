@echo off
echo Starting Jira-like application...

echo Starting MongoDB (assuming it's installed as a service)...
REM If you need to manually start mongod, you can add it here.

echo Installing backend dependencies...
cd backend
call npm install

echo Installing frontend dependencies...
cd ../frontend
call npm install

echo Starting servers...
start cmd /k "cd ../backend && npm run dev"
start cmd /k "cd ../frontend && npm run dev"

echo Both servers are starting...
echo Backend API will be available at http://localhost:5000
echo Frontend will be available at http://localhost:5173
echo Swagger API Docs: http://localhost:5000/api-docs
pause
