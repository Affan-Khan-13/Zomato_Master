import express from "express";

import {UserModel} from "../../database/allModels";

const Router = express.Router();

// to get user based on id
Router.get("/:_id", async(req,res)=> {
  try {
    const {_id} = req.params;
    const getUser = await UserModel.findById(_id);
    return res.status(200).json({user: getUser});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

//update user
Router.put("/update/:_userId", async(req,res)=> {
  try {
    const {userId} = req.params;
    const {userData} = req.body;
    const updateUserData = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: userData
      },
      {new: true}
    );
    return res.status(200).json({user: updateUserData});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});



export default Router;