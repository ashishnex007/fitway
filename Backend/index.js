import express from "express"
import connection from './Database/connection.js'
import { config } from "dotenv";
import router from "./Router/routes.js";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173'], // Update with your frontend URL(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
app.options('*', cors());
app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use("/api", router);
app.use(helmet());

config();

connection().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        })
    } catch (error) {
        console.error("Failed to connect to mongodb server");
    };
}).catch((error) => {
    console.log("Invalid Database connection")
});