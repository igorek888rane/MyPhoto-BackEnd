import {Router} from "express";
import UserController from "../controllers/user-controller.js";
import {registerValidation} from "../../validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import checkAuth from "../utils/checkAuth.js";
import PhotoCardController from "../controllers/photoCard-controller.js";
import CommentController from "../controllers/comment-controller.js";

export const routerAuth = new Router()


routerAuth.post('/registration', registerValidation, handleValidationErrors, UserController.registration)
routerAuth.post('/login', UserController.login)


export const routerUsers = new Router()


routerUsers.get('/users', UserController.getUsers)
routerUsers.get('/me', checkAuth, UserController.authMe)
routerUsers.get('/user/:userName', UserController.getUser)
routerUsers.get('/user-by-id/:id', UserController.getUserById)
routerUsers.put('/update/:id', checkAuth, UserController.updateUser)
routerUsers.put('/subscribe/:id', checkAuth, UserController.subscribe)
routerUsers.put('/unsubscribe/:id', checkAuth, UserController.unsubscribe)


export const routerPhoto = new Router()

routerPhoto.post('/create-photo', checkAuth, PhotoCardController.createPhotoCard)
routerPhoto.put('/update-photo/:id', checkAuth, PhotoCardController.updatePhotoCard)
routerPhoto.delete('/delete/:id', checkAuth, PhotoCardController.deletePhotoCard)
routerPhoto.get('/get-photo-user/:id', checkAuth, PhotoCardController.getPhotoCardUser)
routerPhoto.get('/get-all', PhotoCardController.getAll)
routerPhoto.get('/get-one/:id', PhotoCardController.getOne)
routerPhoto.get('/get-photo-subscribe', checkAuth, PhotoCardController.getPhotoCardSubscribe)


export const routerComment = new Router()

routerComment.post('/create-comment', checkAuth, CommentController.createComment)
routerComment.get('/get-comments', CommentController.getCommentsPhoto)