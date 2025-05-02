const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require('mongodb');
const mongoURL = process.env.MONGODB_URI;

let _db;

const initDb = async () => {
  if (_db) {
    console.log('Db is already initialized!');
    return _db;
  }
  
  try {
    const client = await MongoClient.connect(mongoURL);
    _db = client;
    console.log('Database connection established');
    return _db;
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};