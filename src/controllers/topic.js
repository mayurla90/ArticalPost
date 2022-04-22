var TopicService = require('../services/topic')   


exports.getTopics = async (req, res) => {
    try {
        const topics = await TopicService.getTopics({})
        res.send(topics)
    } catch (e) {
        res.status(500).send()
    }
}

exports.createTopic = async (req, res) => {
    try {      
        const topic = await TopicService.createTopic(req.body)
        res.status(201).send(topic)
    } catch (e) {
        res.status(400).send(e)
    }
}