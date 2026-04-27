import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);