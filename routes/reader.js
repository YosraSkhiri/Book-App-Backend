const router = require('express').Router();
const Reader = require('../models/reader.modal');
const ReadingList = require('../models/readingList.modal');
const Comment = require('../models/comment.modal');
const Rating = require('../models/rating.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

router.route('/register').post((req, res) => {
    
    const {
        first_name,
        last_name,
        email,
        password

    } = req.body;

    if (!first_name || !last_name || !email || !password) {
        
        if(!first_name) {
            return res.status(400).json({
                msg: 'First name is required.'
            });
        }else if(!last_name){
            return res.status(400).json({
                msg: 'Last name is required.'
            });
        }else if(!email){
            return res.status(400).json({
                msg: 'Email is required.'
            });
        } else {
            return res.status(400).json({
                msg: 'Password is required.'
            });
        }
        
    }

    if (password.length < 6) {
        return res.status(400).json({
            msg: 'The password\'s length is less than 6 characters.'
        });
    }

    Reader.findOne({ email: email }, (err, data) => {     
        if(err) {
            return res.status(400).json({
                msg: 'Something went wrong! try again later!'
            });
        }

        if(data) {
            return res.status(400).json({
                msg: 'This email has been already used.'
            });

        } else {
            bcrypt.genSalt(8, function(err, salt) {
                if(err) {
                    return res.status(400).json({
                        msg: 'Something went wrong! try again later!'
                    });
                }
        
                bcrypt.hash(password, salt, function(err, hash) {
                    if(err) {
                        return res.status(400).json({
                            msg: 'Something went wrong! try again later!'
                        });
                    }
        
                    const newReader = new Reader({
                        first_name,
                        last_name,
                        email,
                        password: hash
                    });
                
                    return newReader.save()
                                .then(() => res.json({msg: 'Account is created!'}))
                                .catch(err => res.status(400).json('Error: ' + err));
                });
            });
        }
    });
    
});

router.route('/login').post((req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        if(!email) {
            return res.status(400).json({msg: 'The Email is missing!'});
        }

        if(!password) {
            return res.status(400).json({msg: 'The Password is missing!'});
        }
    }

    Reader.findOne({ email: email }, (err, data) => {
        if(err) {
            return res.status(400).json({msg: 'Something went wrong! Please try again later.'});
        }

        if(data) {
            bcrypt.compare(password, data.password, (err, result) => {
                if(err) {
                    return res.status(400).json({msg: 'Something went wrong! Please try again later.'})
                }

                if(result){
                    jwt.sign({ id: data._id }, process.env.TOKEN_SECRET, (err, token) => {
                        if(err) {
                            return res.status(400).json({msg: 'Something went wrong! Please try again later.'})
                        }
                        
                        return res.cookie('token', token, {httpOnly: true})
                                  .cookie('isLogged', 'true')
                                  .json({msg: 'logged in!'});
                    });

                } else {
                    return res.status(400).json({msg: 'Email or password wrong.'});
                } 
            });
        } else {
            return res.status(400).json({msg: 'Please create an account first!'});
        }
    });
});

router.route('/readinglist').get(verifyToken, (req, res) => {
    readerId = req.user;
    return ReadingList.find().where({reader_id: readerId})
                .then(books => res.json(books))
                .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/readinglist/delete').post(verifyToken, (req, res) => {
    readerId = req.user;
    bookId = req.body.bookId;

    return ReadingList.deleteOne({ reader_id: readerId, book_id: bookId })
                .then(() => res.json({msg: 'book removed'}))
                .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/bookmark').post(verifyToken, (req, res) => {
    readerId = req.user;
    bookId = req.body.bookId;
    cover = req.body.cover;
    title = req.body.title;

    const newBookmark = new ReadingList({
        book_id: bookId,
        reader_id: readerId,
        cover: cover,
        title: title
    });

    ReadingList.exists({book_id: bookId, reader_id: readerId}, function(err, doc){
        if(err) {
            return res.status(400).json('Error: ' + err);
        }else {
            if(!doc) {
                return newBookmark.save()
                    .then(() => res.json({msg: 'Bookmark added.'}))
                    .catch(err => res.status(400).json({msg: 'Something went wrong, Please try again later!'}));
            } else {
                return res.status(400).json({msg: 'this Bookmark already exists'});
            }
        }
    });

});

router.route('/').get(verifyToken, (req, res) => {
    readerId = req.user;
    return Reader.findOne().where({_id: readerId}).select('first_name')
                .then(reader => res.json(reader))
                .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/logout').get(verifyToken, (req, res) => {
    res.clearCookie('token', {httpOnly: true});
    res.clearCookie('isLogged');
    return res.status(200).json({msg: ''});
});

router.route('/comment').post(verifyToken, (req, res) => {
    readerId = req.user;

    Reader.findOne().where({_id: readerId})
    .then(reader => {

        const newComment = new Comment({
            book_id: req.body.bookId,
            comment: req.body.comment,
            reader_id: readerId,
            first_name: reader.first_name,
            last_name: reader.last_name,
        });
    
        newComment.save()
                    .then(() => {
                        res.json({msg: 'Comment successfully added.'})})
                    .catch(err => res.status(400).json('Error: ' + err));

    }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/rating').post(verifyToken, (req, res) => {
    readerId = req.user;

        const newRating = new Rating({
            book_id: req.body.bookId,
            value: req.body.value,
            reader_id: readerId
        });

        Rating.exists({book_id: req.body.bookId, reader_id: readerId}, function(err, doc){
        if(err) {
            return res.status(400).json('Error: ' + err);
        }else {
            if(!doc) {
                return newRating.save()
                    .then(() => res.json({msg: 'You rated this book ' + newRating.value + ' stars.'}))
                    .catch(err => res.status(400).json('Error: ' + err));
            } else {
                return Rating.findOne({book_id: req.body.bookId, reader_id: readerId}).updateOne({value: req.body.value})
                    .then(() => res.json({msg: 'You changed your rating to ' + newRating.value + ' stars.'}))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        }
    });

});




module.exports = router;