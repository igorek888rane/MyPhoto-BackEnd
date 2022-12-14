import mongoose from "mongoose";


const PhotoCardSchema = new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', },
        photoUrl: {type: String, required: true},
        description: {type: String},
        likes: {type: Number, default: 0},
        comments: [{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}],
    },
    {timestamps: true})

export default mongoose.model('PhotoCard', PhotoCardSchema);