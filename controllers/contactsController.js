const mongodb = require('../database/connect');

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
    // Check if id exists in query parameters
    const contactId = req.query.id;
    
    // Log what we received to help debug
    console.log('Received ID:', contactId);
    
    if (!contactId) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }
  
    try {
      let contact;
      
      // If not found with ObjectId, try as regular string ID
      if (!contact) {
        contact = await mongodb
          .getDb()
          .db('cse341')
          .collection('contacts')
          .findOne({ _id: contactId });
      }
      
      // Check if a contact was found
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      
      // Return the contact as JSON
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {
  getAllContacts,
  getSingleContact
};