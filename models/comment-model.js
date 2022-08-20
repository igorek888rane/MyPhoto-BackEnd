import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
        photo: {type: mongoose.Schema.Types.ObjectId, ref: 'PhotoCard',required: true},
        comment: {type: String, required: true},
    },
    {timestamps: true})

export default mongoose.model('Comment', CommentSchema);