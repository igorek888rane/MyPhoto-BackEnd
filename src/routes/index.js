import {Router} from "express";
import UserController from "../controllers/user-controller.js";
import {registerValidation} from "../../validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import checkAuth from "../utils/checkAuth.js";

export const routerAuth = new Router()


routerAuth.post('/registration',registerValidation,handleValidationErrors,UserController.registration)
routerAuth.post('/login', UserController.login)


export const routerUsers = new Router()

routerUsers.get('/users', UserController.getUsers)
routerUsers.get('/me',checkAuth, UserController.authMe)
routerUsers.put('/update/:id', UserController.updateUser)

