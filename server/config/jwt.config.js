const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const User = require('../models/user.model')

module.exports.authenticate = (req, res, next) => {
    
    jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
        if (err) {
            console.log('Authentication error!')
            res.status(401).json({verified:false});
        }else{
            req.Token = payload
            console.log("Authentication successful!")
            next();
        }
    });
}

module.exports.isLoggedIn = (req, res) => {
    // // console.log(req.cookies)
    // jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
    //     // console.log(payload)
    //     if (err) {
    //         // console.log(req)
    //         // console.log(err)
    //         console.log('Logged in user error.')
    //         res.status(401).json({verified:false});
    //     }else{
    //         console.log("Authentication successful!")
    //         // console.log(res)
    //         const user = User.findById(payload._id)
    //         console.log(user)
    //         const {_id,firstName} = user
    //         return res.json({user:{id:_id, firstName:firstName}})
    //         // next();
    //     }
    // });
    const decodedJWT = jwt.decode(req.cookies.userToken, {complete: true });
    User.findById(decodedJWT.payload._id)
    .then(user => 
        // console.log(user))
        res.json({user:user}))
    .catch(err => res.status(400).json(err));
}