@echo off
echo ========================================
echo Starting BookMyShow Backend
echo ========================================
cd backend
echo.
echo Installing dependencies and building...
call mvn clean install
echo.
echo Starting Spring Boot application...
call mvn spring-boot:run
pause

