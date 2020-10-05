const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    author: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    language: {
        type: String,
        required: true,
        trim: true
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;