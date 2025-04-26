const express = require("express")
const app = express()
const lesson01Controller = require("./controllers/lesson01")

app.get('/', lesson01Controller.nameOfFriend)
app.get('/bro', lesson01Controller.nameOfBrother)

const port = 3000 

app.listen(process.env.port || port)