import mongoose from "mongoose";

const Educations = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    school_name: {
        type: String,
        default: '',
    },
    start_year: {
        type: Date,
    },
    end_year: {
        type: Date,
    },
    description: {
        type: String,
        default: '',
    }
},{timestamps: true});

const Education = mongoose.models.Education || mongoose.model("Educations", Educations);
export default Education;