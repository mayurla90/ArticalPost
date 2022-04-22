const express = require('express')
const router = new express.Router()
const Artical = require('../models/artical')
const User = require('../models/user')
const auth = require('../middleware/auth')


var ArticalController = require('../controllers/artical')

// get all articals
router.get('/articals', auth, ArticalController.getAllArticals)

// get most recent articals *Top 3
router.get('/articals/recent', auth,ArticalController.getRecentArticals)


// Get articals by topic
router.get('/articals/topic/:id', auth,ArticalController.getArticalsByTopic)

// edit artical
router.patch('/articals/:id', auth, ArticalController.editArtical)

router.delete('/articals/:id', auth, ArticalController.deleteArtical)


// Create artical
router.post('/articals', auth, ArticalController.createArtical)

// comment on artical
router.post('/articals/:id/comment', auth, ArticalController.commentOnArtical)

//get articles of the following users

router.get('/articals/followingusers', auth, ArticalController.followingUsers)

module.exports = router;