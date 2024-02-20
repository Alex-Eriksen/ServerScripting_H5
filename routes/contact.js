const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const mongoose = require('mongoose');

// Create a new contact
router.post('/contact', async (req, res) =>
{
    try
    {
        req.body._id = new mongoose.Types.ObjectId();
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// Get all contacts
router.get('/contact', async (req, res) =>
{
    try
    {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// Get a single contact
router.get('/contact/:id', getContact, (req, res) =>
{
    res.json(res.contact);
});


// Update a contact
router.put('/contact/:id', getContact, async (req, res) =>
{
    if (req.body.firstName != null)
    {
        res.contact.firstName = req.body.firstName;
    }
    if (req.body.lastName != null)
    {
        res.contact.lastName = req.body.lastName;
    }
    if (req.body.email != null)
    {
        res.contact.email = req.body.email;
    }
    if (req.body.phone != null)
    {
        res.contact.phone = req.body.phone;
    }
    try
    {
        await Contact.findByIdAndUpdate(req.params.id, res.contact, { new: true }).then((updatedContact) =>
        {
            res.json(updatedContact);
        });
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
});

// Delete a contact
router.delete('/contact/:id', getContact, async (req, res) =>
{
    try
    {
        await Contact.findByIdAndDelete(req.params.id).then(() =>
        {
            res.json({ message: 'Contact deleted' });
        });
    } catch (err)
    {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single contact by ID
async function getContact(req, res, next)
{
    try
    {
        const contact = await Contact.findById(req.params.id);
        if (contact == null)
        {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.contact = contact;
        next();
    } catch (err)
    {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
