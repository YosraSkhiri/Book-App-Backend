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

    summary: {
        type: String,
        required: true,
        trim: true
    },

    release_date: {
        type: String
    },

    type_ids: {
        type: String
    },

    author_ids: {
        type: String
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;