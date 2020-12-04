const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readerSchema = new Schema({
    username: {
        type: String
    },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    photo: {
        type: String
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        minlength: 6,
        required: true
    }
});

const Reader = mongoose.model('Reader', readerSchema);
module.exports = Reader;