import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/health', (req, res) => {
  res.send('FinGenie Server Running')
})

export { app }
