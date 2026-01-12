import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        default: "",
    },
    birthday: {
        type: String,
        required: true,
        trim: true,
        default: '',
    },
     email: {
        type: String,
        trim: true,
        required: true,
        default: "",
        unique: true,
    },
    phone: {
        type: String,
        trim: true,
        default: "",
    },
    password: {
        type: String,
        trim: true,
        required: false,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    specialization: {
        type: String,
        default: "",
    },
    avatar_url: {
        type: String,
        default: "",
    }
},{timestamps: true});

const User = mongoose.models.User || mongoose.model("User", UserModel);
export default User;