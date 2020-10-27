const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 

    photo: {
        type: String
    },

    birth_date: {
        type: String
    },

    nationality: {
        type: String
    }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;