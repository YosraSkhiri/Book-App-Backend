const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 

    photo: {
        type: String,
        required: true,
        trim: true
    },

    birthdate: {
        type: String,
        required: true,
        trim: true
    }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;