import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { router } from './routes/subscribers.js'
dotenv.config()

const app = express()


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())
const subscribersRouter = router
app.use('/subscribers', subscribersRouter)
app.listen(4000, () => console.log('server started'))

