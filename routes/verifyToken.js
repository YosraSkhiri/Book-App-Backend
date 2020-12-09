const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({msg: 'Access Denied!, Please Login first.'});
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified.id;
        next();

    } catch(err) {
        res.status(400).json({msg: 'You\'re not logged in!'+err});
    }
}