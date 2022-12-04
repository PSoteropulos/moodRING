const mongoose = require('mongoose')

const MoodSchema = new mongoose.Schema({

    trackURI: {
        type: String,
        required:[true, "Track URI is required."],
        minLength:[5, "Track URI must be longer than 4 characters."],
        maxLength:[50," Track URI can not exceed 50 characters."]
    },

    moodDescription: {
        type: String,
        required:[true, "Mood description is required."],
        minLength:[3, "Mood description must be longer than 2 characters."],
        maxLength:[30, "Mood description can not exceed 30 characters."]
    },

    hueRotateValue: {
        type: Number,
        required:[true, "Hue rotate value is required."],
        min:0,
        max:359
    },

    brightnessValue: {
        type: Number,
        required:[true, "Brightness value is required."],
        min:50,
        max:100
    },

    saturateValue: {
        type: Number,
        required:[true, "Saturate value is required."],
        min:10,
        max:500
    },

}, {timestamps:true });

module.exports = mongoose.model('Mood', MoodSchema)