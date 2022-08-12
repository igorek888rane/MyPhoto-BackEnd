import PhotoCardModel from "../models/photoCard-model.js";
import UserModel from "../models/user-model.js";
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import userModel from "../models/user-model.js";

class PhotoCardController {
    async createPhotoCard(req, res) {
        try {

            const userId = req.userId;
            let fileName = Date.now().toString() + req.files.photoUrl.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.photoUrl.mv(path.join(__dirname, '../..', 'uploads/PhotoCard', fileName))

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
            const photoCardId = req.params.id
            const count = Number(req.body.likes)

            if (req.body.likes) {
                const photoCard = await PhotoCardModel.findByIdAndUpdate({_id: photoCardId}, {
                    $inc: {likes: count}
                })
                if (count === 1) {
                    await UserModel.findByIdAndUpdate({_id: req.userId}, {
                        $push: {likes: req.params.id}
                    })
                } else if (count === -1) {
                    await UserModel.findByIdAndUpdate({_id: req.userId}, {
                        $pull: {likes: req.params.id}
                    })
                }

                res.json(photoCard)
            } else {
                const items = req.body
                const photoCard = await PhotoCardModel.findByIdAndUpdate({_id: photoCardId}, {
                    ...items
                })
                res.json(photoCard)
            }

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
            const photoCards = await PhotoCardModel.find({user: userId})

            res.json(photoCards)
        } catch (e) {
            res.json({message: 'Не удалось найти фото'})
        }
    }

    async getAll(req, res) {
        try {
            const photoCards = await PhotoCardModel.find().sort('-createdAt')
            res.json(photoCards)
        } catch (e) {
            res.json({message: 'Не удалось найти посты'})
        }
    }

    async getOne(req, res) {
        try {
            const photoCard = await PhotoCardModel.findById(req.params.id)
            res.json(photoCard)
        } catch (e) {
            res.json({message: 'Не удалось найти пост'})
        }
    }

    async getPhotoCardSubscribe(req, res) {
        try {
            const user = await userModel.findById(req.userId)
            const photoCards = []
            const photo = await Promise.all(
                user.subscriptions.map(user => PhotoCardModel.find({user: user}).sort('-createdAt'))
            )
            photo.forEach(el=>el.forEach(p=>photoCards.push(p)))
            res.json(photoCards)
        } catch (e) {
            res.json({message: 'Не удалось найти фото'})
        }
    }
}

export default new PhotoCardController()