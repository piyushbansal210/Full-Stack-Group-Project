# Quiz Game – MERN Stack Full-Stack Application

## Overview
This project is a full-stack web application developed for COMP4347/COMP5347. It is a single-player online quiz game built using the MERN stack (MongoDB, Express, React, Node.js).

The application provides:
- A player interface for taking quizzes and viewing results  
- An admin interface for managing quiz questions  

The system focuses on clean architecture, RESTful API design, authentication, and robust client–server interaction.

---

## Tech Stack

### Frontend
- React (Functional Components)
- React Context + useReducer (state management)
- React Hook Form + Zod (form validation)

### Backend
- Node.js
- Express.js

### Database
- MongoDB with Mongoose

### Authentication & Security
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Rate limiting (login & quiz submission)
- Input validation and basic XSS protection

---

## Features

### User Functionality
- Register and login/logout  
- Take quiz (6–10 questions per attempt)  
- One answer per question (no changes after submission)  
- View final score immediately  
- View past quiz attempts  
- View leaderboard (ranked by highest score)  

### Admin Functionality
- Admin login (protected)  
- Create, edit, delete questions  
- Toggle question active/inactive  
- Bulk import questions via JSON  
- Manage variation-specific fields  

---

## Game Mechanics (Core Requirements)
- Each quiz contains 6–10 multiple-choice questions  
- Each question has 4 options and 1 correct answer  
- Questions are fetched via REST API  
- Questions are shuffled per attempt  
- Scoring: +1 per correct answer  
- Final score is stored with:
  - userId  
  - answers (questionId, selectedAnswer, isCorrect)  
  - timestamp  

---

## Selected Variation: Review Mode After Completion

After completing the quiz, users can:
- View all questions attempted  
- See correct vs incorrect answers  
- View explanations for each question  

### Design Justification
This variation improves learning by allowing users to:
- Understand mistakes  
- Reinforce correct answers  
- Review the full quiz after completion  

---

## System Architecture

The application follows a layered architecture:
- Frontend (React) – UI and state management  
- Backend (Express) – API and business logic  
- Database (MongoDB) – data persistence  

### Backend Structure
