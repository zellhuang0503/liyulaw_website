@echo off
REM 理宇法律事務所網站 Netlify 部署腳本

echo 開始部署到 Netlify...

REM 進入客戶端目錄
cd client

REM 安裝依賴
echo 安裝前端依賴...
call npm install

REM 構建前端
echo 構建前端應用...
call npm run build

REM 使用 Netlify CLI 部署
echo 部署到 Netlify...
call npx netlify deploy --prod

echo 部署完成！
pause
