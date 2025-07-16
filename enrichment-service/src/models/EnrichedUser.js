const mongoose = require('mongoose');

const EnrichedUserSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  linkedin: String,
  github: String,
});

module.exports = mongoose.model('EnrichedUser', EnrichedUserSchema);
