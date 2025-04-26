const express = require("express")
const router = new express.Router()
const lesson01Controller = require("../controllers/lesson01")

router.get("/", lesson01Controller.nameOfFriend)
router.get("/bro", lesson01Controller.nameOfBrother)
