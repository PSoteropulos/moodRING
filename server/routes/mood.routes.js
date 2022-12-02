const MoodController = require('../controllers/mood.controller')
// const {authenticate, isLoggedIn} = require('../config/jwt.config')

module.exports = (app) => {
    app.get('/api/allMoods', MoodController.getAllMoods)
    app.get('/api/mood/:id', MoodController.getOneMood)
    app.post('/api/addMood', MoodController.addMood)
    app.put('/api/update/:id', MoodController.updateMood)
    app.delete('/api/delete/:id', MoodController.deleteMood)
}