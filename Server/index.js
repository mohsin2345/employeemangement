import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:5173", // Adjust origin as needed
  methods: ['GET', 'POST', 'PUT',"DELETE"],
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

// Enable CORS with the defined options
app.use(cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());

app.use(cookieParser())

// Route requests to /auth to the adminRouter
app.use('/auth', adminRouter);

app.use('/employee',EmployeeRouter)

app.use(express.static('Public'))
    
     const verifyUser =(req, res,next) =>{
      const token = req.cookies.token;
      if(token) {
            jwt.verify(token,        "jwt_secret_key",(err,decoded)=>{
              if(err) return res.json({Status:false,Error:"Wrong Token"})
              req.id=decoded.id;
             req.role = decoded.role;
             next()
            }
          )
      } else {
        return res.json({Status:false,Error:"Not autheticated"})
      }

     }
app.get('/verify',verifyUser, (req,res)=> {
           return res.json({Status:true,role:req.role,id:req.id})
})

// Start the server
app.listen(3000, () => {
    console.log("Server is running");
});
