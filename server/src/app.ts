import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

type ConsultationRequest = {
  question: string
  jurisdiction: string
}

config()

const app = express()
app.use(cors())
app.use(express.json())

// 法律諮詢端點
app.post('/api/legal-advice', async (req, res) => {
  const { question, jurisdiction } = req.body as ConsultationRequest
  
  // TODO: 實作OpenAI整合
  
  res.json({ advice: '暫未實作' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
