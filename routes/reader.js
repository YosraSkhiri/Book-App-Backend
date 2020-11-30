const router = require('express').Router();
const Reader = require('../models/reader.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

/*router.route('/login').post((req, res) => {
    const {email, password} = body.req;

    if(!email || !password) {

    }

    const reader = await Reader.findOne({ email: email });

    if(!reader) {

    }

    const isMatch = await bcrypt.compare(password, reader.password);

    if(!isMatch) {

    } 

    const token = jwt.sign({ id: reader._id });

});*/

module.exports = router;