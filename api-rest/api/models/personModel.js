const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: 'Enter person name'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'ContactSchema'
    }]
});

module.exports = mongoose.model('Person', PersonSchema);