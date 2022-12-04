const MoodController = require('../controllers/mood.controller')
const {authenticate, isLoggedIn} = require('../config/jwt.config')

module.exports = (app) => {
    app.get('/api/allMoods', authenticate, MoodController.getAllMoods)
    app.get('/api/mood/:id', authenticate, MoodController.getOneMood)
    app.post('/api/addMood', authenticate, MoodController.addMood)
    app.put('/api/update/:id', authenticate, MoodController.updateMood)
    app.delete('/api/delete/:id', authenticate, MoodController.deleteMood)
}