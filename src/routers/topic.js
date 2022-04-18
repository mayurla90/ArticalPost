const express = require('express')
const router = new express.Router()
const Topic = require('../model/topic')
const auth = require('../middleware/auth')


router.get('/topics', auth, async (req, res) => {

    try {
        const topics = await Topic.find({});
        res.send(topics)
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/topics', auth, async (req, res) => {
    try {
        // const task = new Topic(req.body);
        const topic = new Topic({
            ...req.body
        });
        await topic.save()
        res.status(201).send(topic)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router;