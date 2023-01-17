const Event = require('../models/event')
const Allday = require('../models/allday')

const create_event = async(req, res)=>{

    try {
        const event = new Event(req.body)
        await event.save()
        res.send({event})
    } catch (e) {
        const error = e.mesaage
        res.send({error})
    }
}
const get_events = async(req, res)=>{

    try {
        const events =await Event.find({owner: req.user._id}).sort({strt:'asc'})
        res.send({events})
    } catch (e) {
        const error = e.mesaage
        res.send({error})
    }
}
const get_a_event = async(req, res)=>{
    try {
        const event = await Event.find({_id:req.params.id})
        res.send({event})
    } catch (e) {
        const error = e.mesaage
        res.send({error})
    }
}

const post_allday = async(req, res)=>{
    try {
        const event = new Allday(req.body)
        await event.save()
        res.send({event})
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}
const get_allday = async(req, res)=>{
    try {
        const events = await Allday.find({owner: req.user._id})
        res.send({events})
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}
const get_a_allday_event = async(req, res)=>{
    try {
        const event = await Allday.find({_id:req.params.id})
        res.send({event})
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}

const delete_evt = async(req, res)=>{
    try {
        
        const id = req.params.id
        await Event.findByIdAndDelete(id)
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}
const allday_delete_evt = async(req, res)=>{
    try {
        const id = req.params.id
        await Allday.findByIdAndDelete(id)
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}
const edit_evt = async(req,res)=>{
    try {
        const id = req.params.id
        const event = await Event.findById(id)
        event.start = req.body.start
        event.end = req.body.end
        event.item = req.body.item
        event.location = req.body.location
        event.strt = req.body.strt
        await event.save()
        res.statut(200).send()
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}

const edit_allevt = async(req, res)=>{
    try {
        const id = req.params.id
        const daily = await Allday.findById(id)
        daily.item = req.body.item
        daily.location = req.body.location
        await daily.save()
        res.send()
    } catch (e) {
        if(req.error){
            const error = req.error.mesaage
            return res.send({error})
        }
        const error = e.mesaage
        res.send({error})
    }
}

module.exports = {
    create_event,
    get_a_event,
    get_events,
    post_allday,
    get_allday,
    get_a_allday_event,
    delete_evt,
    allday_delete_evt,
    edit_allevt,
    edit_evt
}