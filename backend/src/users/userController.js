import userModel from "../models/user.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt"
import { config } from "../config/config.js";
import pkg from "jsonwebtoken"; 
const { sign, verify } = pkg;  


const createUser = async (req, res, next) =>{

    const {name, email, password, role} = req.body

    
    if (!name || !email || !password || !role) {
        return next(createHttpError(400, "All fields are required"));
    }

    if (!["farmer", "vendor"].includes(role)) {
        return next(createHttpError(400, "Invalid role"));
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return next(createHttpError(400, "User already exists"));
        }
    } catch (error) {
        console.error("Database Error:", error);
        return next(createHttpError(500, "Error while checking existing user"));
    }

    let newUser;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser = await userModel.create({
             name, 
             email, 
             password: hashedPassword,
             role
            })
            

    } catch (error) {
        console.error("Database Error:", error);
        return next(createHttpError(500, "Error while creating new user"));
    }
    if (!config.jwtSecret) {
        console.error("JWT Secret is missing in config!");
        return next(createHttpError(500, "Internal server error"));
    }

    try {
        const token = sign({ sub: newUser._id }, config.jwtSecret, {
            expiresIn: "1h",    
            algorithm: "HS256",
        });

        res.status(201).json({ token });
    } catch (error) {
        console.error("Token Generation Error:", error);
        return next(createHttpError(500, "Error while creating token"));
    }
    //





}



export {createUser}