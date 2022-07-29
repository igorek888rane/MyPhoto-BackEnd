import mongoose from "mongoose";


const PhotoCardSchema = new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
        photoUrl: {type: String, required: true},
        description: {type: String},
        likes: {type: Number, default: 0},
        comments: {type: Number, default: 0},
    },
    {timestamps: true})

export default mongoose.model('PhotoCard', PhotoCardSchema);