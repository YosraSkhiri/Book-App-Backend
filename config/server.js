const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const bookRouter = require('../routes/books');
const authorRouter = require('../routes/authors');
const categoryRouter = require('../routes/category');
const readerRouter = require('../routes/reader');
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/categories', categoryRouter);
app.use('/readers', readerRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});