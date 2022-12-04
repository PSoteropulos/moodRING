const Mood = require('../models/mood.model')

module.exports = {

    getAllMoods: (req,res)=>{
        Mood.find().sort({createdAt:-1})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    getOneMood: (req,res)=>{
        Mood.findById(req.params.id)
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    addMood: (req,res)=> {
        // console.log(req.body)
        Mood.create(req.body)
        .then((result)=>{
            // console.log(result)
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    updateMood:(req,res)=>{
        Mood.updateOne({_id:req.params.id},req.body,{new:true, runValidators:true})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    deleteMood:(req,res)=>{
        Mood.deleteOne({_id:req.params.id})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    }
}