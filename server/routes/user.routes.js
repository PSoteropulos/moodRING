const UserController = require('../controllers/user.controller');
const {authenticate, isLoggedIn} = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/register', UserController.registerUser),
    app.post('/api/login', UserController.loginUser)
    app.get('/api/getLoggedUser', isLoggedIn)
    app.get('/api/logout', UserController.logOutUser) //should be a POST request
    app.get('/api/view/:username', authenticate, UserController.getAllMoodsByUser)
    // app.get('/api/getLoggedUser', UserController.getLoggedUser),
}
// Below is what Peter said should go in every axios call with cookies (front end)
// axios.post(url, {}, {withCredential:true})