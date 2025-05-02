const express = require("express")
const router = express.Router()

router.use(express.static("public"))
router.use("/css", express.static(__dirname + "public/styles"))
router.use("/js", express.static(__dirname + "public/scripts"))
router.use("/images", express.static(__dirname + "public/images"))

module.exports = router