import cors from 'cors';
import express from 'express';
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import fs from 'fs'

const app = express();


// configuring the app ...
// Middlewares ...
app.use(
    cors({
        origin : ["http://localhost:3000" , "http://localhost:5173"],
        credentials : true
    })
)

// Multer middleware ...
const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, "./uploads")
    },
    filename: function(req, file, cb){
      cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
  })

// Multer configuration ...
const upload = multer({storage: storage})

// Middlewares ...
app.use((req, res,next) =>{
    res.header("Access-Control-Allow-Origin","*") // whatch it ...
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next()
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/uploads", express.static("uploads"))


// routes ...
app.get("/", (req, res)=>{
    res.json({message : "hello chai aur code"});
})

app.post("/upload"  , upload.single('file'),function(req , res){
    console.log("file uploaded");
})


app.listen(8000 , ()=>{
    console.log("App is listening at port 8000");
})

