const express = require('express')
const router = express.Router()
const  postMessage  = require('../controllers/userController')

router.route('/').post(postMessage)

module.exports = router