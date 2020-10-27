const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    cover: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    summary: {
        type: String,
        required: true,
        trim: true
    },

    release_date: {
        type: String
    },

    language: {
        type: String
    },

    type_ids: {
        type: Array
    },

    author_ids: {
        type: Array
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;