const express = require('express')
const controller = require('../controllers/eventCont')
const auth = require('../middleware/auth')
const router = express.Router()

const allday = '/alldayevents'
const evnt = '/events'

//To create a new event in DB
router.post(evnt,auth, controller.create_event)
//To Create a new allday event
router.post(allday,auth, controller.post_allday)
//To fetch all timely events
router.get(evnt,auth, controller.get_events)
//To fetch all allday events from DB
router.get(allday,auth, controller.get_allday)
//To fetch a single allday event
router.get(allday+'/edit/:id',auth, controller.get_a_allday_event)
//TO get an event to edit
router.get(evnt+'/edit/:id',auth, controller.get_a_event)
//To delete a event from db
router.delete(evnt+'/:id',auth, controller.delete_evt)
//To  delete a allday event from db
router.delete(allday+'/:id',auth, controller.allday_delete_evt)
//To edit a timely event in DB
router.put(evnt+'/edit/:id',auth, controller.edit_evt)
//To edit a allday event in DB
router.put(allday+'/edit/:id',auth, controller.edit_allevt)



module.exports = router