import express  from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session"

require("dotenv").config();

//conig 
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

//Database Connection
import ConnectDB from "./database/connection"

//API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/orders";
import Reviews from "./API/reviews";
import User from "./API/User";


const zomato = express();

zomato.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
  }));


zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(cors());
zomato.use(helmet());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//For Application Routes(localhost:4000/auth/signup)
zomato.use("/auth",Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menu);
zomato.use("/image",Image);
zomato.use("/order",Order);
zomato.use("/reviews",Reviews);
zomato.use("/user",User);



zomato.get("/",(req,res)=>{
    res.json({message: "SetUp was Succesful"})
})

zomato.listen(4000, ()=>{
    ConnectDB().then(()=>console.log("Connection Established"))
    .catch(()=>console.log("connection failed"))
    console.log("Server Running")
})