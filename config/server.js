const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(cookieParser());
app.use(express.json());

const bookRouter = require('../routes/books');
const authorRouter = require('../routes/authors');
const categoryRouter = require('../routes/category');
const readerRouter = require('../routes/reader');
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/categories', categoryRouter);
app.use('/readers', readerRouter);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});