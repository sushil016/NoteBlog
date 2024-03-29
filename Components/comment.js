const Post = require("../Models/postModel2")
const Comment = require("../Models/commentModel2")
// const { response } = require("express");

exports.createComment = async (req, res)=>{
    try{
        const{ post, user, body } = req.body;

        const comment = new Comment({
             post,
             user,
             body
            })
    
        const  newComment = await comment.save();


        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: newComment._id } },
            { new: true })
            .populate("comment");
           

             res.json({
                post: updatedPost,
            })
    }
   catch(err){
    console.log(err)
       return res.status(500)
           .send(`Error creating the comment ${err}`)
   }


   }
