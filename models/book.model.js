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
        type: String,
        required: true
    },

    type_ids: {
        type: String,
        required: true
    },

    author_ids: {
        type: String,
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;