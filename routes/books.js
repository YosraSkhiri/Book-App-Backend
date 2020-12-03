const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let Book = require('../models/book.model');
const Comment = require('../models/comment.modal');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/books');
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
    if(req.query.category) {
        const TypeId = req.query.category;
        let regex = new RegExp(TypeId,'i');
        return Book.find(
            {
                $or: [
                {'type_ids': regex}
             ]
            }
        )
            .then(books => res.json(books))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    return Book.find()
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

router.route('/:name/:id').get((req, res) => {
    const bookId = req.params.id;
    return Book.findOne().where({_id: bookId})
                 .then(book => res.json(book))
                 .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.single('cover'), (req, res) => {
    const title = req.body.title;
    const author_ids = req.body.authors;
    const type_ids = req.body.categories;
    const summary = req.body.summary;
    const release_date = req.body.release_date;

    if(!title || !author_ids || !type_ids || !summary || !release_date) {
        return res.status(400).json({
            msg: 'All fields are required!'
        });
    }
    
    let cover = '';

    if(req.file) {
        cover = req.file.filename
    }

    const newBookData = {
        title,
        author_ids,
        type_ids,
        summary,
        cover,
        release_date      
    }
    
    const newBook = new Book(newBookData);

    return newBook.save()
            .then(() => res.json({msg: 'Book Added'}))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/comments').get((req, res) => {
    const bookId = req.query.id;
    return Comment.find().where({book_id: bookId}).sort({date: 'desc'})
                 .then(comments => res.json(comments))
                 .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;