import express from "express";
import {config} from "./config/config.js"
import cors from "cors"


const app = express();


app.use(cors(
    {
        origin: "http://localhost:5173",
    }
)) 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({message: "hello"});
});




export default app
