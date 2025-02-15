# 立宇法律諮詢平台

## 環境需求
- Node.js 18+
- PostgreSQL 15+
- OpenAI API 金鑰

## 安裝步驟
1. 複製儲存庫
2. 在根目錄建立 `.env` 檔案
3. 安裝依賴：
```
cd client && npm install
cd ../server && npm install
```
4. 初始化資料庫(詳見server/db/init.sql)
5. 啟動開發伺服器：
```
npm run dev
```

## 環境變數範例
```
# 前端
VITE_API_BASE_URL=http://localhost:3001

# 後端
PORT=3001
DATABASE_URL=postgres://user:pass@localhost:5432/liyu_law
OPENAI_API_KEY=your_key_here
```
