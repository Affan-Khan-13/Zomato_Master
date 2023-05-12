import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {UserModel} from "../../database/user";


const Router = express.Router();
 
//Sign Up
Router.post("/signup",async(req,res)=>{
    try{
    
        //if email or number exists(refer Database/user)
        await UserModel.findEmailAndPhone(req.body.credentials);

        //hashing Password(refer Database/user)

        //creating and inserting in user model
        const newUser = await UserModel.create(req.body.credentials);

        //JWT Auth Token(refer Database/user)
        const token = newUser.generateJwtToken();
        return res.status(200).json({token})
       
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
});

//Signing in or login (involves checking credentials also refer "databse/user" for all functiond below)
Router.post("/signin",async(req,res)=>{
    try{
        const doesUserExist = await UserModel.findByEmailAndPassword(req.body.credentials);

        const token = doesUserExist.generateJwtToken();
        return res.status(200).json({token, status:"success"})
       
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
});

export default Router;