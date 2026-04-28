import 'dotenv/config';   
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

connectDB();

app.use('/api/auth', authRoutes);

// app.use(authMiddleware);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);