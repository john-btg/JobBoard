
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    let verif = req.header("token");
    if (!verif) {
        console.log('This token is mandatory');
    }
    try {
        let result = jwt.verify(verif, "hello");
        req.user = result.users;
        next();

    } catch (e) {
        res.status(400).json({
            msg: 'Token is not valid'
        })
    }

}