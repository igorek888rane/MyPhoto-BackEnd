import CommentModel from "../models/comment-model.js";
import PhotoCardModel from "../models/photoCard-model.js";

class CommentController {
    async createComment(req, res) {
        try {
            const {photo, comment} = req.body
            const newComment = new CommentModel({
                comment,
                photo,
                user: req.userId,

            })
            await newComment.save()
            await PhotoCardModel.findByIdAndUpdate(photo, {
                $push: {comments: newComment._id}
            })
            res.json(newComment)
        } catch (e) {
            res.json({message: 'Что-то пошло не так.'})
        }
    }

    async getCommentsPhoto(req, res) {
        try {
            // const photoId = req.params.id
            const comments = await CommentModel.find()
            res.json(comments)
        } catch (e) {
            res.json('Error')
        }

    }
}

export default new CommentController()