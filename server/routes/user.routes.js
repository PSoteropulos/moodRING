const UserController = require('../controllers/user.controller');
const {isLoggedIn} = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/register', UserController.registerUser),
    app.post('/api/login', UserController.loginUser)
    app.get('/api/getLoggedUser', isLoggedIn)
    app.get('/api/logout', UserController.logOutUser)
    // app.get('/api/getLoggedUser', UserController.getLoggedUser),
}