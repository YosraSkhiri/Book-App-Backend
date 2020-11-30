const router = require('express').Router();
let Category = require('../models/category.modal');

router.route('/add').post((req, res) => {
    const category = req.body.category;
    const newCategory = new Category({ category });

    if(!category) {
        return res.status(400).json({msg: 'Enter a category first.'});
    }

    Category.exists({ category }, function(err, doc){
        if(err) {
            return res.status(400).json('Error: ' + err);
        }else {
            if(!doc) {
                return newCategory.save()
                            .then(() => res.json({msg: 'the '+ category +' category is added!'}))
                            .catch(err => res.status(400).json('Error: ' + err));
            } else {
                return res.status(400).json({msg: 'this category already exists'});
            }
        }
    });
});

module.exports = router;