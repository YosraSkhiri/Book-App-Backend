const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const authors = req.body.authors;
    const description = req.body.description;
    const cover = req.body.cover;

    const newBookData = {
        title,
        authors,
        description,
        cover      
    }

    const newBook = new Book(newBookData);

    newBook.save()
            .then(() => res.json('Book Added'))
            .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;