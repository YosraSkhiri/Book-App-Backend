const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readingListSchema = new Schema({
    book_id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    cover: {
        type: String,
        required: true
    },

    reader_id: {
        type: String,
        required: true
    },
});

const ReadingList = mongoose.model('ReadingList', readingListSchema);

module.exports = ReadingList;