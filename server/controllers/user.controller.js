const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
// const {isLoggedUser} = require('../config/jwt.config')

module.exports = {
    
    registerUser: async (req,res) => {
        try{
            // Create a new user
            const newUser = await User.create(req.body)
            // Create a JWT using our secret key
            const userToken = jwt.sign({_id:newUser._id, email:newUser.email},SECRET)
            // Send the JWT back to user as a cookie
            res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:newUser})
            // res.status(201).cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + 90000)}).json({successMessage:'User logged in', user:newUser})
        }catch(error){
            res.status(400).json(error)
        }
    },

    loginUser: async (req,res) => {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({error:"Invalid email or password."})
        }
        try{
            const isPasswordValid = await bcrypt.compare(req.body.password,user.password)
            console.log(isPasswordValid)
            if(!isPasswordValid){
                res.status(400).json({error:"Invaild email or password."})
            }else{
                const userToken = jwt.sign({_id:user._id,email:user.email},SECRET)
                console.log("User data follows:",user)
                res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:user})
                // res.status(201).cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + 90000)}).json({successMessage:'User logged in', user:user})
            }
        }catch(error){
            res.status(400).json({error:"Invalid email or password."})
        }
    },

    // getLoggedUser: (req,res) => {
    //     console.log(req.cookies)
    //     if (req.cookies == null){
    //         console.log("No logged in user")
    //         return false
    //     }else{
    //         const decodedJWT = jwt.decode(req.cookies.userToken, {complete: true });
    //         console.log('Decoded jwt id:', decodedJWT.payload._id)
    //         User.findById(decodedJWT.payload._id)
    //         .then(user => (
    //             // console.log(user),
    //             res.json(user)))
    //         .catch(err => (
    //             // console.log(err),
    //             res.status(400).json(err)));
    //     }
    // },

    // loggedInUser: (req,res) => {

    // },

    logOutUser: (req,res) =>{
        res.clearCookie('userToken')
        // res.status(200).clearCookie('userToken').json({success:"User logged out."})
        res.json({success:"User logged out."})
    }
}