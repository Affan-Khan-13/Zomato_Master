import express from "express";
import passport from "passport";


import { FoodModel } from "../../database/allModels";
import {ValidateRestaurantId, ValidateCategory} from "../../validation/food";


const Router = express.Router();

//food based on restaurant
Router.get("/:id",async (req,res)=>{
    try{
        ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant: _id});
        return res.status(200).json({foods});
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
})


//
Router.get("/r/:category",async(req,res)=>{
    try{
        ValidateCategory(req.params);
        const {category} = req.params;
        const foods = await FoodModel.find({
          category: { $regex: category, $options: "i"}
        })
    return res.status(200).json({foods});
    }

    catch(error){
        res.json(500).json({error: error.message})
    }
})

export default Router;