import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
        email: {type: String, unique: true, required: true},
        userName: {type: String, unique: true, required: true},
        passwordHash: {type: String, required: true},
        userStatus: {type: String, default: ''},
        userAvatar: {type: String, default: ''},
        photoCards: [{type: mongoose.Schema.Types.ObjectId, ref: 'PhotoCard'}],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'PhotoCard'}],
        subscriptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        subscribers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    },
    {timestamps: true})

export default mongoose.model('User', UserSchema);