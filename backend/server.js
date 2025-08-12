import express from "express";
import mongoose from "mongoose";
import './models/db.js'
import router from './routes/AuthRouter.js'
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/api',router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




























































