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

router.route('/').get((req, res) => {
    if(req.query.typeIds) {
        const categoryIds = req.query.typeIds.split(',');
        return Category.find().where('_id').in(categoryIds)
            .then(categories => res.json(categories))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    
    return Category.find().collation({locale: "en", strength: 1 }).sort({category:'asc'})
            .then(categories => res.json(categories))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search').get((req, res) => {
    const category = req.query.category;
    let regex = new RegExp(category,'i');
    return Category.find({
        $or: [
        {'category': regex}
     ]
    }).limit(4)
            .then(categories => res.json(categories))
            .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;