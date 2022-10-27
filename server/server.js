const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose  = require("mongoose");
const cors = require('cors');

const app = express();
app.use(express.json({}))
app.use(cors())
app.use("/uploads",express.static(path.join(__dirname, "./uploads/")));

const PORT = 5000;
const FileModel = require("./model")

const router = express.Router();

const storage = multer.diskStorage({
   destination: "./uploads/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myfile")

const obj =(req,res,next) => {
 try {    
    upload(req, res,  () => {
        next();
     });
 } catch (error) {
    console.log(error)  
 }
}

router.post("/fileupload", obj, async (req,res)=>{
    try {     
        const file = new FileModel();
        file.path = req.file.path;
        await file.save()
        res.status(200).send({"file":`${req.protocol}://${req.get('host')}/${file.path}`});
    } catch (error) {
        console.log(error)
    }
});

app.use(router);

app.get("/",(req,res)=>{
   return res.send("<p>hello!</p>");
});

mongoose.connect("mongodb://localhost:27017/fileupload").then(()=>{console.log("DB is connected")})

app.listen(PORT,()=>{
   console.log("+ app listen on port",PORT,"\u{1F525}\u{1F680}")
});