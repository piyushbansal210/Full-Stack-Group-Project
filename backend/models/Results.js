import mongoose from 'mongoose';
import { Question } from './Question.js';

const resultsSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
        validate: {
            validator: async (id) => !!(await Question.findById(id)),
            message: 'Referenced question does not exist',
        },
    },
    chosenAnswer: String,
    correctAnswer: String,
    quizInstanceGuid: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export const Results = mongoose.model('Results', resultsSchema);