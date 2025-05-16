const express = require("express")
const app = express()
const homeRoute = require('./routes/index')
const contactsRoute = require('./routes/contactsRoute')
const mongodb = require('./database/connect')
const static = require("./routes/static")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const bodyParser = require('body-parser')

app.use(static)
app.use(express.json());
app.get('/', homeRoute)
app.get('/bro', homeRoute)
app.use('/contacts', contactsRoute)

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'ACcess-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
  })

// Root endpoint
app.get('/', (req, res) => {
  res.send('Contacts API is running. Visit <a href="/api-docs">API Documentation</a>');
});

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