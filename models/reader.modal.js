const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readerSchema = new Schema({
    username: {
        type: String
    },

    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    photo: {
        type: String
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String,
        minlength: 6
    }
});

const Reader = mongoose.model('Reader', readerSchema);
module.exports = Reader;