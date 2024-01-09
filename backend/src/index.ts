import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL as string)


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/test', async (req: Request, res: Response) => {
    res.json({ message: 'Hey there I am talking from express ' });
})

app.listen(7000, () => {
    console.log('Server is running at port 7000')
})

