const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let Author = require('../models/author.modal');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/authors');
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

router.route('/add').post(upload.single('photo'), (req, res) => {
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    let photo = '';

    if(req.file) {
        photo = req.file.filename
    }

    const newAuthorData = {
        name,
        birthdate,
        photo
    }

    const newAuthor = new Author(newAuthorData);

    return newAuthor.save()
             .then(() => res.json('Author Added'))
             .catch(err => res.status(400).json({msg: err}));
});

router.route('/:name/:id').get((req, res) => {
    const authorId = req.params.id;
    return Author.findOne().where({_id: authorId})
                 .then(author => res.json(author))
                 .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search').get((req, res) => {
    const author = req.query.author;
    let regex = new RegExp(author,'i');
    return Author.find({
        $or: [
        {'name': regex}
     ]
    }).limit(4)
      .then(authors => res.json(authors))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Author.find().collation({locale: "en" }).sort({name:'asc'})
            .then(authors => res.json(authors))
            .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;