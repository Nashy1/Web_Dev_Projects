import mongoose from "mongoose";

const postSchema =mongoose.Schema(
    {
        userId:{
            type:String,
            require:true,
        },
        firstName:{
            type:String,
            require:true,
        },
        lastName:{
            type:String,
            require:true,
        },  
        laction:String,
        description:String,
        picturePath:String,
        userPicturePath:String,
        likes:{
            type:Map,
            of: Boolean,
        }
    }
)