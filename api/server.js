const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoute = require('./routes/user.route.js')
const orderRoute = require('./routes/order.route.js')
const conversationRoute = require('./routes/conversation.route.js')
const messageRoute = require('./routes/message.route.js')
const reviewRoute = require('./routes/review.route.js')
const gigRoute = require('./routes/gig.route.js')
const authRoute = require('./routes/auth.route.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()



async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO)
        app.listen(8800,console.log('listening on port 8800'))
    } catch (error) {
        console.log(error)
    }
    
}
app.use(cors({origin:"http://localhost:5173", credentials:true,}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/gigs', gigRoute)
app.use('/api/conversations', conversationRoute)
app.use('/api/reviews', reviewRoute)
app.use('/api/messages', messageRoute)
app.use('/api/orders', orderRoute)

app.use((err, req, res, next) =>{
    const errStatus = err.status || 500
    const errorMessage = err.message 
    return res.status(errStatus).send(errorMessage)
})

connectToDatabase() 