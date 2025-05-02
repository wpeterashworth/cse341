const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Get all contacts
router.get('/', contactsController.getAllContacts);

// Get single contact by ID
router.get('/single', contactsController.getSingleContact);

module.exports = router;