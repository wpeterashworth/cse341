const express = require("express")
const router = new express.Router()
const lesson01Controller = require("../controllers/lesson01")
const contactsController = require('../controllers/contactsController');

// Get all contacts
router.get('/contacts', contactsController.getAllContacts);

// Get single contact by ID
router.get('/contacts/single/:id', contactsController.getSingleContact);

router.post('/contacts', contactsController.newContact)

// Update a contact by ID
router.put('/contacts/:id', contactsController.updateContact);

// Delete a contact by ID
router.delete('/contacts/:id', contactsController.deleteContact);

router.get("/", lesson01Controller.nameOfFriend)
router.get("/bro", lesson01Controller.nameOfBrother)

module.exports = router
