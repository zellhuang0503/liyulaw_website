// 伺服器啟動腳本
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

// 設定環境變數
config();
if (!process.env.PORT) process.env.PORT = '3001';
if (!process.env.DATABASE_URL) process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/liyu_law';
if (!process.env.OPENAI_API_KEY) process.env.OPENAI_API_KEY = 'your_key_here';

console.log('環境變數已設定臨時值');

// 使用 ts-node 啟動 app.ts
const command = 'npx';
const args = ['ts-node', '--esm', '--transpile-only', 'src/app.ts'];

const child = spawn(command, args, {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error(`啟動伺服器時發生錯誤: ${error}`);
  process.exit(1);
});

child.on('close', (code) => {
  if (code !== 0) {
    console.log(`伺服器進程以代碼 ${code} 結束`);
  }
});
