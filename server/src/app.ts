import { Request, Response } from 'express';
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
require('./tempenv')  // 導入臨時環境變數設定

type ConsultationRequest = {
  question: string
  jurisdiction: string
}

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// 法律諮詢端點
app.post('/api/legal-advice', async (req: Request, res: Response) => {
  const { question, jurisdiction } = req.body as ConsultationRequest
  
  // TODO: 實作OpenAI整合
  
  res.json({ advice: '暫未實作' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
