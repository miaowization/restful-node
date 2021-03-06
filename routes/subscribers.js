import express from 'express'
import subscriber from '../models/subscriber.js'
export var router = express.Router()
import Subscriber from '../models/subscriber.js'

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedChannel != null) {
        res.subscriber.subscribedChannel = req.body.subscribedChannel
    }

    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }
    catch {
        res.status(400).json({ message: err.message })
    }
})


router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted this subscriber' })

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedChannel: req.body.subscribedChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next) {
    try {
        var subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}

