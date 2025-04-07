// controllers/contactController.js

const Contact = require('../models/contactModel');

// Controller function for handling form submission
exports.submitForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: 'Message submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in submitting the message.' });
  }
};

// Controller function to fetch all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in fetching messages.' });
  }
};

// Controller function to delete a message by ID
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the message' });
  }
};
