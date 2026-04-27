import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    accountCreationTime: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

export const User = mongoose.model('User', userSchema);