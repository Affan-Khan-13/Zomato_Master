import express from "express";

import { OrderModel } from "../../database/allModels";

const Router = express.Router();

//get orders based on userid
Router.get("/:_id",async (req,res)=>{
    try{
        const {_id} = req.params;
        const getOrders = await OrderModel.findOne({user: _id});
        if(!getOrders) {
            return res.json({error: "Orders not Found"});
        }
        return res.status(200).json({getOrders});

    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
});

//post orders
Router.post("/new/:_id",async(req,res)=>{
    try{
        const {_id} = req.params;
        const {orderDetails} = req.body;
        const addNewOrder = await OrderModel.findByIdAndUpdate(
            {
                user : _id
            },
            {
                $push: {orderDetails: orderDetails}
            },
            {
                new: true
            }
        );
        return res.status(200).json({addNewOrder});
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
})

export default Router;