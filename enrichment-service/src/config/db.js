const mongoose = require('mongoose');

function connectDB() {
  return mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/enrichment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectDB;
