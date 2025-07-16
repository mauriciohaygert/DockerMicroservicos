const express = require('express');
const EnrichedUser = require('../models/EnrichedUser');

const router = express.Router();

// GET /users/enriched/:uuid
router.get('/enriched/:uuid', async (req, res) => {
  try {
    const user = await EnrichedUser.findOne({ uuid: req.params.uuid });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ linkedin: user.linkedin, github: user.github });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await EnrichedUser.find({}, { _id: 0, __v: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
