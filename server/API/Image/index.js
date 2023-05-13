import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../database/allModels";
import {s3Upload} from "../../utils/AWS/s3"

const Router = express.Router();

//Multer config
const storage = multer.memoryStorage();
const upload = multer({storage});



//uploading given image to s3bucket and then saving the file to mongodb
Router.post("/",upload.single("file"),async(req,res)=>{
    try{
        const file = req.file;
         
        const bucketOptions = {
            Bucket: "160120749302bucket",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        }

        const uploadImage = await s3Upload(bucketOptions);
        res.status(200).json({uploadImage});

    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
})

export default Router;