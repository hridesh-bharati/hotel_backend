// routes/contactRouter.js
const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactContoller.js');

// POST route to submit contact form
router.post('/submit', ContactController.submitForm);

// GET route to fetch all messages
router.get('/messages', ContactController.getMessages);

// DELETE route to delete a message by ID
router.delete('/:id', ContactController.deleteMessage);

module.exports = router;
