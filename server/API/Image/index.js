import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../database/allModels";
import {s3Upload} from "../../utils/AWS/s3"

const Router = express.Router();

//Multer config
const storage = multer.memoryStorage();
const upload = multer({storage});

//AWS s3 Bucket config
const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACSESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1"
})


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

    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
})

export default Router;