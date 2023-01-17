const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')
const eventRouter = require('./routers/event')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(userRouter)
app.use(eventRouter)


mongoose.set('strictQuery', true)
mongoose.connect(process.env.DBURL).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('App is up in running at PORT: ' + process.env.PORT)
    })
})