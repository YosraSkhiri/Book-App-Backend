const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String
    },

    book_id: {
        type: String
    },

    reader_id: {
        type: String
    },

    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;