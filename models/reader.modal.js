const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const readerSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    photo,

    email: {
        type: String
    },

    password: {
        type: String
    }
});