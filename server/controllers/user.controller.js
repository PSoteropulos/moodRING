const User = require('../models/user.model')
const Mood = require('../models/mood.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
// const {isLoggedUser} = require('../config/jwt.config')

module.exports = {

    registerUser: async (req,res) => {
        try{
            console.log('req body follows', req.body)
            // Create a new user
            const newUser = await User.create(req.body)
            console.log(newUser, "found")
            // Create a JWT using our secret key
            const userToken = jwt.sign({_id:newUser._id, email:newUser.email},SECRET)
            // Send the JWT back to user as a cookie
            res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:newUser})
            // res.status(201).cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + 90000)}).json({successMessage:'User logged in', user:newUser})
        }catch(error){
            console.log(error)
            res.status(400).json(error)
        }
    },

    loginUser: async (req,res) => {
        if(req.body.email){
            // console.log(req.body)
            const user = await User.findOne({email:req.body.email}).exec()
            console.log(user)
            try{
                const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
                console.log(isPasswordValid)
                if(!isPasswordValid){
                    res.status(400).json({error:"Invalid email or password."})
                }else{
                    const userToken = jwt.sign({_id:user._id,email:user.email},SECRET)
                    console.log("User data follows:",user)
                    res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:user})
                    // res.status(201).cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + 90000)}).json({successMessage:'User logged in', user:user})
                }
            }catch(error){
                console.log(error)
                res.status(400).json({error:"Invalid email or password."})
            }
        }else{
            res.status(400).json({error:"Invalid email or password."})
        }
        // if(!user){
        //     res.status(400).json({error:"line 26 Invalid email or password."})
        // }
        
    },

    getAllMoodsByUser: (req,res)=>{
        console.log(req.params)
        Mood.find({postedBy: req.params.username}).sort({createdAt:-1})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
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

// Brendan stuff below


// loginUser: async (req, res) => {
//     try {
//         //check if user exists
//         const user = await UserModel.findOne({ email: req.body.email })
//         if (user) { //waits for user variable
//             //check to see if password entered matches password in DB
//             const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
//             if (passwordsMatch) { //they match!
//                 //generate the userToken
//                 const userToken = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '2h' })
//                 //log the user in
//                 res.status(201).cookie('userToken', userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }).json(user)
//             }
//             else{ //passwords don't match but email does
//                 res.status(400).json({message: "Invalid email/password combination"})
//             }
//         }
//         //if user does not exist
//         else {
//             res.status(400).json({ message: "Invalid email/password combination" })
//         }
//     }
//     catch (err) {
//         res.status(400).json(err) //differs from Caden's
//     }
// },


// registerUser: async (req, res) => { //use async await when you have a lot of logic
//     try { //check if user exists first
//         const potentialUser = await UserModel.findOne({ email: req.body.email })
//         if (potentialUser) {
//             res.status(400).json({ message: "Email Address is taken" })
//         }
//         else {
//             //actually create user if they pass check
//             const newUser = await UserModel.create(req.body)

//             //generates a jsonwebtoken string
//             const userToken = jwt.sign(
//                 { _id: newUser._id, email: newUser.email }, //cookie payload for browser
//                 secret, //this will be used as a key to verify cookie creation (jwt sign)
//                 { expiresIn: '2h' } //browser will clear the cookie after two hours
//             )

//             res
//                 .status(201)
//                 .cookie(
//                     'userToken',
//                     userToken,
//                     { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }) //sets to 72million seconds for cookie age
//                 .json(newUser) //succesful creation of user and cookie
//         }
//     }
//     catch (err) { //bad request
//         res.status(400).json(err) //differs from Cadens
//     }
// },