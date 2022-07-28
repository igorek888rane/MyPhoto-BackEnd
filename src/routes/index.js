const Router = require('express').Router;
const UserController = require('../controllers/user-controller');


 const routerAuth = new Router()


routerAuth.post('/registration',UserController.registration)
routerAuth.post('/login',UserController.login)
routerAuth.post('/logout',UserController.logout)
routerAuth.get('/activate/:link',UserController.activate)
routerAuth.get('/refresh',UserController.refresh)
routerAuth.get('/users',UserController.getUsers)

module.exports = routerAuth