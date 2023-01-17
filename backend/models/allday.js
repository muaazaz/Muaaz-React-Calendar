const mongoose = require('mongoose')

const alldayeventSchema = new mongoose.Schema({
    time:{
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
    }
},{
    timestamps: true
})

const AlldayEvent = mongoose.model('alldayevent',alldayeventSchema)

module.exports = AlldayEvent