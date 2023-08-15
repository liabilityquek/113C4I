const userController = require("../controller/userController");
const express = require('express')
const router = express.Router()

router.post('/create-user', userController.create)

module.exports = router