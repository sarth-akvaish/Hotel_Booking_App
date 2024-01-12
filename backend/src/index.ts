import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser';

mongoose.connect(process.env.MONGODB_URL as string)
    .then(() => console.log('connected to database', process.env.MONGODB_URL))


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(7000, () => {
    console.log('Server is running at port 7000')
})

