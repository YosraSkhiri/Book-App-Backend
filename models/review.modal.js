const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String
    },

    rating_value: {
        type: Number
    },

    book_id,
    reader_id
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;