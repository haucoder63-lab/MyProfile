import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
    user_id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    objectives: string[];
    skills_focus: string[];
    career_goals: string[];
    createdAt: Date;
    updatedAt: Date;
}

const AboutSchema: Schema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    objectives: [{
        type: String,
        required: true
    }],
    skills_focus: [{
        type: String,
        required: true
    }],
    career_goals: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);