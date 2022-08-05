import {Router} from "express";
import UserController from "../controllers/user-controller.js";
import {registerValidation} from "../../validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import checkAuth from "../utils/checkAuth.js";
import PhotoCardController from "../controllers/photoCard-controller.js";

export const routerAuth = new Router()


routerAuth.post('/registration',registerValidation,handleValidationErrors,UserController.registration)
routerAuth.post('/login', UserController.login)


export const routerUsers = new Router()


routerUsers.get('/users', UserController.getUsers)
routerUsers.get('/me',checkAuth, UserController.authMe)
routerUsers.get('/user/:id', UserController.getUser)
routerUsers.put('/update/:id',checkAuth, UserController.updateUser)


export const routerPhoto = new Router()

routerPhoto.post('/create-photo',checkAuth, PhotoCardController.createPhotoCard)
routerPhoto.put('/update-photo/:id',checkAuth, PhotoCardController.updatePhotoCard)
routerPhoto.delete('/delete/:id',checkAuth, PhotoCardController.deletePhotoCard)
routerPhoto.get('/get-photo-user/:id',checkAuth, PhotoCardController.getPhotoCardUser)
routerPhoto.get('/get-all', PhotoCardController.getAll)
routerPhoto.get('/get-one/:id', PhotoCardController.getOne)