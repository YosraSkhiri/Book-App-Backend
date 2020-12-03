const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readingListSchema = new Schema({
    book_id: {
        type: String
    },

    title: {
        type: String
    },

    cover: {
        type: String
    },

    reader_id: {
        type: String
    },
});

const ReadingList = mongoose.model('ReadingList', readingListSchema);

module.exports = ReadingList;