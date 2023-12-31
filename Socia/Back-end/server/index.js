import  express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/users.js"; 
import postRoutes from "./Routes/posts.js";
import {createPost} from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import{users, posts} from "./data/index.js";



/*Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan);
app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));



/*File Storage*/
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
    filename: function (req,file,cb){
        cb(null,file.originalname);
    }
})//this was got from the github of multer. so anytime uploads a file onto the the websit. it will be saved to p/a
const upload = multer({storage});


/*Routes with Files */
app.post("/auth/register", upload.single("picture"),register);
app.post("/posts", verifyToken, upload.single("picture"),createPost)

/*Routes */
app.use("/auth" ,authRoutes)
app.use("/users",userRoutes)
app.post("/post",postRoutes)


/*MONGOOSE SETUP */
const PORT = process.env.PORT|| 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(()=>{
        app.listen(PORT,()=> console.log(`Server PORT :${PORT}`));
        /*ADD DATA ONE TIMEs */
        // User.insertMany(users);
        // Post.insertMany(posts);
    }).catch((error => console.log(`${error} did not connect`)));
