const Post = require("../Models/postModel2")

exports.createPost  = async (req, res) => {
    try {
        const {title, body} = req.body;

        const  post = new Post({title,body});

        const postCreated = await post.save( );

        res.json({
            success:true,
            postdata:postCreated,
            message:"post  created"
        })
    } catch (error) {
        console.log(error)
    }
}


exports.getAllPosts = async (req,res)=>{
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            data : posts,
        })
    } catch (error) {
        console.log(error);
        
    }
}