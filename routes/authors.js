const router = require('express').Router();
let Author = require('../models/author.modal');

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const birthdate = req.body.birthdate;

    const newAuthorData = {
        name,
        birthdate
    }

    const newAuthor = new Author(newAuthorData);

    newAuthor.save()
             .then(() => res.json('Author Added'))
             .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;