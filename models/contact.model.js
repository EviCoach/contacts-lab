const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    first_name: { type: String, required: true, },
    last_name: { type: String },
    other_name: { type: String },
    phone_numbers: { type: Array },
},
    { timestamps: true });

const ContactS = mongoose.model('Contacts', ContactSchema);

module.exports = ContactS;