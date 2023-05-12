import express  from "express";
import cors from "cors";
import helmet from "helmet";
require("dotenv").config();

//Database Connection
import ConnectDB from "./database/connection"

//API
import Auth from "./API/Auth";

const zomato = express();


zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(cors());
zomato.use(helmet());

//For Application Routes(localhost:4000/auth/signup)
zomato.use("/auth",Auth);



zomato.get("/",(req,res)=>{
    res.json({message: "SetUp was Succesful"})
})

zomato.listen(4000, ()=>{
    ConnectDB().then(()=>console.log("Connection Established"))
    .catch(()=>console.log("connection failed"))
    console.log("Server Running")
})