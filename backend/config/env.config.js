require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://db-master:perro123@mi-bd.snhr7ql.mongodb.net/?retryWrites=true&w=majority&appName=mi-bd"
};