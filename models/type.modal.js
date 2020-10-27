const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const typeSchema = new Schema({
    type: {
        type: String
    }
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;