import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    user_id: mongoose.Types.ObjectId;
    email: string;
    phone: string;
    address: string;
    social_links: {
        platform: string;
        url: string;
        icon: string;
    }[];
    availability: string;
    preferred_contact: string;
    createdAt: Date;
    updatedAt: Date;
}

const ContactSchema: Schema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    social_links: [{
        platform: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }],
    availability: {
        type: String,
        required: true
    },
    preferred_contact: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);