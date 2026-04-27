## Setup/ Requirements 

### Prerequisites
- Node.js
- npm
- Docker Desktop

### Database setup (if you haven't already, via Docker)  (this should be a one time thing btw)

1.  `docker pull mongodb/mongodb-community-server:latest`
2.  `docker run -d --name quiz-mongo -p 27017:27017 -v quiz-mongo-data:/data/db mongodb/mongodb-community-server:latest`
    Note: quiz-mongo is the container name 

### Backend setup 

1. `cd backend`
2. `npm install`
3. `cp .env.example .env` and fill out relevant environment vars 

## Backend process running: 

Nodejs server - `npm run dev`

Database (if using Docker) - `docker start <container-name>`
