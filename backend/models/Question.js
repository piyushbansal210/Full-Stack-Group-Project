import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true,
    },
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    category: String,
    correctAnswer: {
        type: String,
        required: true,
    },
});

export const Question = mongoose.model('Question', questionSchema);