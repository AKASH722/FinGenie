import express from 'express'
import dotenv from 'dotenv'
import transactionRouter from './routers/transaction.router.js'
import userRouter from './routers/user.router.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.send('FinGenie Server Running')
})

app.use('/api/user', userRouter)
app.use('/api/transactions', transactionRouter)

export { app }
