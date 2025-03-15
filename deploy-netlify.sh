#!/bin/bash

# 理宇法律事務所網站 Netlify 部署腳本

echo "開始部署到 Netlify..."

# 進入客戶端目錄
cd client

# 安裝依賴
echo "安裝前端依賴..."
npm install

# 構建前端
echo "構建前端應用..."
npm run build

# 使用 Netlify CLI 部署
echo "部署到 Netlify..."
npx netlify deploy --prod

echo "部署完成！"
