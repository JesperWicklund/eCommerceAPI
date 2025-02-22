const express =  require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT  || 5000

connectDB()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/send_message', require('./routes/userMessageRoute'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))