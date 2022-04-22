const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')


var TopicController = require('../controllers/topic')

router.get('/topics', auth, TopicController.getTopics)
router.post('/topics', auth, TopicController.createTopic)

module.exports = router;