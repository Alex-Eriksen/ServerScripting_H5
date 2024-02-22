const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate: {
            validator: function (v)
            {
                return /^[a-zA-Z]+$/.test(v);
            },
        },
        message: "First name must contain only letters"
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate: {
            validator: function (v)
            {
                return /^[a-zA-Z]+$/.test(v);
            },
        },
        message: "Last name must contain only letters"
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        validate: {
            validator: function (v)
            {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
        },
        message: "Email must be in the format of an email address"
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
        validate: {
            validator: function (v)
            {
                return /^[0-9]{8}$/.test(v);
            },
        },
        message: "Phone number must be 8 digits"
    }
});

module.exports = mongoose.model('Contact', contactSchema, 'contacts');