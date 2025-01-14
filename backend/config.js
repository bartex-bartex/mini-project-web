require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET,
  dbUri: process.env.DB_URI,
};