const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo DB success');
});

const bookRouter = require('./routes/books');
const authorRouter = require('./routes/authors');
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})