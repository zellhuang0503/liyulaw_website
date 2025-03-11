// 臨時環境變數設定
const dotenv = require('dotenv');
dotenv.config();

// 設定預設環境變數
if (!process.env.PORT) process.env.PORT = '3001';
if (!process.env.DATABASE_URL) process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/liyu_law';
if (!process.env.OPENAI_API_KEY) process.env.OPENAI_API_KEY = 'your_key_here';

console.log('環境變數已設定臨時值');
