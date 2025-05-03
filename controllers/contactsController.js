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

module.exports = {
  getAllContacts,
  getSingleContact
};