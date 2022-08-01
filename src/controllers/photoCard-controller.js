import PhotoCardModel from "../models/photoCard-model.js";
import UserModel from "../models/user-model.js";
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

class PhotoCardController {
    async createPhotoCard(req, res) {
        try {
            const userId = req.params.id;
            let fileName = Date.now().toString() + req.files.photoUrl.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.photoUrl.mv(path.join(__dirname,'../..','uploads/PhotoCard',fileName))

            const doc = new PhotoCardModel({
                user: userId,
                photoUrl: fileName,
                description: req.body.description,
            })
            const photoCard = await doc.save()


            await UserModel.findByIdAndUpdate({_id: userId}, {
                $push: {photoCards: photoCard}
            })
            res.json({
                success: true,
                photoCard
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Не удалось обновить данные пользователя',
            });
        }
    }

    async updatePhotoCard(req, res) {
        try {
            const items = req.body
            const photoCardId = req.params.id
            await PhotoCardModel.findByIdAndUpdate({_id: photoCardId}, {
                ...items
            })
            res.json({
                success: true,

            })
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Не удалось обновить данные пользователя',
            });
        }
    }

    async deletePhotoCard(req, res) {
        try {
            const photoCardId = req.params.id;
            const photoCard = await PhotoCardModel.findByIdAndDelete(photoCardId)
            if (!photoCard) return res.json({message: 'Такого посто не существует'})
            await UserModel.findByIdAndUpdate(req.userId, {
                $pull: {photoCards: photoCardId}
            })
            res.json({
                success: true,
                photoCard
            })

        } catch (e) {
            res.json({message: 'Не удалось удалить пост'})
        }

    }

    async getPhotoCardUser(req, res) {
        try {
            const userId = req.params.id
            const photoCard = await PhotoCardModel.find({user: userId})
            res.json({
                success: true,
                photoCard
            })
        } catch (e) {
            res.json({message: 'Не удалось найти посты'})
        }
    }

    async getAll(req, res) {
        try {
            const photoCards = await PhotoCardModel.find().sort('-createdAt')
            res.json({
                success: true,
                photoCards
            })
        } catch (e) {
            res.json({message: 'Не удалось найти посты'})
        }
    }

    async getOne(req, res) {
        try {
            const photoCard = await PhotoCardModel.findById(req.params.id)
            res.json({
                success: true,
                photoCard
            })
        } catch (e) {
            res.json({message: 'Не удалось найти пост'})
        }
    }
}

export default new PhotoCardController()