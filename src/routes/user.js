const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

var UserController = require('../controllers/user')

router.post('/users', UserController.registerUser)
router.post('/users/login', UserController.loginUser)
router.post('/users/logout', UserController.logoutUser)
router.post('/users/following/:id', auth, UserController.followUser)
router.post('/users/unfollowing/:id', auth, UserController.unfollowUser)

module.exports = router;