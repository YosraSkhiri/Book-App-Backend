const router = require('express').Router();
let Category = require('../models/category.modal');

router.route('/add').post((req, res) => {
    const category = req.body.category;
    const newCategory = new Category({ category });

    Category.exists({ category }, function(err, doc){
        if(err) {
            console.log(err);
        }else {
            if(!doc) {
                newCategory.save()
                            .then(() => res.json('Category Added!'))
                            .catch(err => res.status(400).json('Error: ' + err));
            } else {
                console.log("this category already exists");
            }
        }
    });
});

module.exports = router;