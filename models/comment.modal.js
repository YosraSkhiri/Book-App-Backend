const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
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

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;