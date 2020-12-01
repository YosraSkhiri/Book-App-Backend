const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let Book = require('../models/book.model');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    let allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter });

router.route('/').get((req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/search').get((req, res) => {
    const book = req.query.book;
    let regex = new RegExp(book,'i');
    return Book.find({
        $or: [
        {'title': regex}
     ]
    }).limit(4)
      .then(books => res.json(books))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.single('cover'), (req, res) => {
    const title = req.body.title;
    const authors = req.body.authors;
    const description = req.body.description;
    let cover = '';

    if(req.file) {
        cover = req.file.filename
    }

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