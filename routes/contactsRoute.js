const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Get all contacts
router.get('/', contactsController.getAllContacts);

// Get single contact by ID
router.get('/single/:id', contactsController.getSingleContact);

router.post('/', contactsController.newContact)

// Update a contact by ID
router.put('/:id', contactsController.updateContact);

// Delete a contact by ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;