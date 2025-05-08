const mongodb = require('../database/connect');
const express = require('express')
const app = express()
app.use(express.json())

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('cse341').collection('contacts').find();
    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleContact = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const database = mongodb.getDb().db('cse341');

        const collection = database.collection('contacts');

        let contact =  await collection.findOne({ "contacts.id": id });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        contact = contact.contacts.find(contact => contact.id === id);

        res.status(200).json(contact)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new contact and add it to the contacts array
const newContact = async (req, res) => {
  try {
    // Get the contact data from the request body
    const contactData = req.body;
    
    // Validate required fields
    if (!contactData.firstName || !contactData.lastName || !contactData.email) {
      return res.status(400).json({ error: 'Required fields missing: firstName, lastName, and email are required' });
    }

    // Connect to the database and collection
    const database = mongodb.getDb().db('cse341');
    const collection = database.collection('contacts');

    // Find the main document that contains the contacts array
    // If it doesn't exist yet, we'll create it
    const mainDocument = await collection.findOne({});
    
    let nextId = 1;
    
    if (mainDocument) {
      // If the document exists, get the current contacts array
      const contacts = mainDocument.contacts || [];
      
      // Find the highest ID to determine the next ID
      if (contacts.length > 0) {
        const highestId = Math.max(...contacts.map(contact => contact.id));
        nextId = highestId + 1;
      }
      
      // Add ID to the new contact
      const newContact = { ...contactData, id: nextId };
      
      // Update the existing document by pushing the new contact to the contacts array
      const result = await collection.updateOne(
        { _id: mainDocument._id },
        { $push: { contacts: newContact } }
      );
      
      if (result.modifiedCount === 0) {
        return res.status(500).json({ error: 'Failed to add contact' });
      }
      
      res.status(201).json({
        message: 'Contact created successfully',
        contact: newContact
      });
    } else {
      // If no document exists yet, create the first one with an array containing the new contact
      const newContact = { ...contactData, id: nextId };
      
      const result = await collection.insertOne({
        contacts: [newContact]
      });
      
      res.status(201).json({
        message: 'Contact created successfully',
        contact: newContact
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not create new contact' });
  }
};

// Update a contact by ID
const updateContact = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    
    // Validate required fields
    if (!updatedData.firstName || !updatedData.lastName || !updatedData.email) {
      return res.status(400).json({ error: 'Required fields missing: firstName, lastName, and email are required' });
    }

    // Connect to the database and collection
    const database = mongodb.getDb().db('cse341');
    const collection = database.collection('contacts');

    // Find the document containing the contact with this ID
    const document = await collection.findOne({ "contacts.id": id });
    
    if (!document) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Update the contact in the array while preserving the id
    const result = await collection.updateOne(
      { "contacts.id": id },
      { $set: { "contacts.$[elem]": { ...updatedData, id } } },
      { arrayFilters: [{ "elem.id": id }] }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    if (result.modifiedCount === 0) {
      return res.status(304).json({ message: 'No changes made to the contact' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not update contact' });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Connect to the database and collection
    const database = mongodb.getDb().db('cse341');
    const collection = database.collection('contacts');

    // Find the document containing the contact with this ID
    const document = await collection.findOne({ "contacts.id": id });
    
    if (!document) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Remove the contact from the contacts array
    const result = await collection.updateOne(
      { "contacts.id": id },
      { $pull: { contacts: { id: id } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    if (result.modifiedCount === 0) {
      return res.status(500).json({ error: 'Failed to delete contact' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not delete contact' });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  newContact,
  updateContact,
  deleteContact
};