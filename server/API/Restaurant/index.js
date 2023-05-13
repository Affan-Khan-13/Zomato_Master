import express from "express";
import { RestaurantModel } from "../../database/allModels";


const Router = express.Router();

//get all restaurants
Router.get("/",async(req,res)=>{
    try{
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.status(200).json({restaurants});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

//get particular restaurant
Router.get('/:_id', async(req,res)=>{
    try{
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findOne(_id);
        if(!restaurant){
            return res.status(404).json({error: "Restaurant not found"})
        }
        return res.status(200).json({restaurant});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
})



//get restauant from searching
Router.get("/search", async(req,res)=>{
    try{
        const {searchString} = req.body;
        const restaurants = await RestaurantModel.find(
            {
                name: {$regex: searchString, $options: "i"}
            }
        )
        return res.status(200).json(restaurants)
    }
    catch(error){
        return json.status(500).json({error: error.message})
    }
})

export default Router;