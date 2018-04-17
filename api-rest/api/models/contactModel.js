const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: 'Enter contact name'
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    social: {
        type: String
    },
    whatsapp: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: 'Enter owner id'
    },
}, { runSettersOnQuery: true });

module.exports = mongoose.model('Contact', ContactSchema);