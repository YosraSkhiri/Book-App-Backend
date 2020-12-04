const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    value: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },

    book_id: {
        type: String,
        required: true
    },

    reader_id: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;