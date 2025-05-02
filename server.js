const express = require("express")
const app = express()
const homeRoute = require('./routes/index')
const contactsRoute = require('./routes/contactsRoute')
const mongodb = require('./database/connect')
const static = require("./routes/static")

app.use(static)
app.use(express.json());
app.get('/', homeRoute)
app.get('/bro', homeRoute)
app.use('/contacts', contactsRoute)

const port = 8080

const startServer = async () => {
    try {
      // Initialize the database
      await mongodb.initDb()
      
      app.listen(port, () => {
        console.log(`Connected to DB and listening on http://localhost:${port}`)
      })
    } catch (err) {
      console.error('Failed to start server:', err)
      process.exit(1) // Exit with error code
    }
  };

startServer()