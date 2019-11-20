const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    first_name: { type: String, required: true, },
    last_name: { type: String, required: true, },
    other_name: { type: String, required: true },
}, { timestamps: true });

module.exports = ContactSchema;