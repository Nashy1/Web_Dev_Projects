import Post from "../models/Post.js"

/*Create*/

export const createPost = async(req,res)=>{
    try{
        const {userId,description,picturePath} = req.body;
        const user =await User.findById(userId);
        const newPost =new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save();

        const post =await Post.find();//this is find all the posts.

        res.status(201).json(post);

    }catch(err){
        res.status(409).json({msg:err.msg})
    }
}


/*READ */
export const getFeedPosts = async(req,res)=>{
    try{
        const post =await Post.find();//this is find all the posts.

        res.status(200).json(post);

    }catch(err){
        res.status(404).json({msg:err.msg})
    }
}

export const getUserPosts = async(req,res)=>{
    try{
        const{userId} = req.params;
        const post =await Post.find({userId});//this is find all the posts by userId.

        res.status(200).json(post);

    }catch(err){
        res.status(404).json({msg:err.msg})
    }
}


/*UPDATE*/
 export const likePost =async(req,res)=>{
    try{
        const {id}=req.params;
        const{userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
    }

    const updatedPost =await Post.findByIdUpdate(
        id,
        {likes: post.likes},
        {new:true}
    );

        res.status(200).json(updatedPosts);

    }catch(err){
        res.status(404).json({msg:err.msg})
    }
}