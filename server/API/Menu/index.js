import express from "express";

import {MenuModel, ImageModel} from "../../database/allModels";


const Router = express.Router();

//menu through restaurants
Router.get('/list/:_id', async(req,res)=>{
    try{
        const {_id} = req.params
        const menus = await MenuModel.findOne(_id);
        res.status(200).json({menus})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//getting images
Router.get("/image/:_id", async(req,res)=> {
    try {
      const {_id} = req.params;
      const menus = await ImageModel.findOne(_id);
      return res.status(200).json({menus});
      
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  });


export default Router