const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    value: {
        type: Number
    },

    book_id: {
        type: String
    },

    reader_id: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;