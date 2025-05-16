// swagger-setup.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts stored in MongoDB',
    version: '1.0.0',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  tags: [
    {
      name: 'Contacts',
      description: 'Endpoints for managing contacts'
    }
  ],
  definitions: {
    Contact: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      favoriteColor: "blue",
      birthday: "January 1st, 2000"
    },
    ContactInput: {
      $firstName: "John",
      $lastName: "Doe",
      $email: "john.doe@example.com",
      $favoriteColor: "blue",
      $birthday: "January 1st, 2000"
    },
    NewContactResponse: {
      message: "Contact created successfully",
      contact: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        favoriteColor: "blue",
        birthday: "January 1st, 2000"
      }
    },
    Error: {
      error: "Error message"
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);