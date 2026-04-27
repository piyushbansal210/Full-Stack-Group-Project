import mongoose from "mongoose";
import "dotenv/config";
import { NIL as uuidNIL } from "uuid";
import { User } from "../models/User.js";
import { Question } from "../models/Question.js";
import { Results } from "../models/Results.js";

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        await User.deleteMany({});
        await Question.deleteMany({});
        await Results.deleteMany({});

        console.log("Database cleared");

        const users = await User.insertMany([
            { username: "LeBron", hashedPassword: "saltedAndHashedPassword", isAdmin: true },
            { username: "Alice", hashedPassword: "saltedAndHashedPassword", isAdmin: false },
        ]);

        const questions = await Question.insertMany([
            { question: "How many r's in strawberry", answer1: "1", answer3: "2", answer3: "3", answer4: "4", category: "General Knowledge", correctAnswer: "3" },
            { question: "How big is the ocean?", answer1: "0", answer3: "Not very big", answer3: "Quite big", answer4: "Very big", category: "Oceans", correctAnswer: "Very big" }
        ]);

        const results = await Results.insertMany([
            { questionId: questions[0]._id, chosenAnswer: "1", correctAnswer: "3", quizInstanceGuid: uuidNIL },
            { questionId: questions[1]._id, chosenAnswer: "0", correctAnswer: "Very big", quizInstanceGuid: uuidNIL }
        ]);

        console.log("Seed data inserted");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();