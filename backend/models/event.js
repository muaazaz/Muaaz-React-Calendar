const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    start:{
        type: String,
        maxLength:10,
        unique: true
    },end:{
        type: String,
        maxLength:10
    },item:{
        type: String,
        maxLength:30
    },location:{
        type: String,
        maxLength:255
    },owner:{
        type: mongoose.Types.ObjectId,
        maxLength:256
    },
    strt:{
        type:Number,
        maxLength:10
    }
})

const Event = mongoose.model('event',eventSchema)

module.exports = Event