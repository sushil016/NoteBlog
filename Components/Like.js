const Post = require("../Models/postModel2");
const like = require("../Models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    const Like = new like({
      post,
      user,
    });
    const savedLike = await Like.save({ user });

    const updatedlike = await Post.findByIdAndUpdate(
      post,
      { $push: { Likes: savedLike._id } },
      { new: true }
    ).populate();

    return res.status(201).json({
      post: updatedlike,
      message: "Liked a Post",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
      success: false,
      message: "something went wrong while liking a post",
    });
  }
};


exports.unLikePost = async (req,res) =>{
    try {
        const {post , like} = req.body;

        const unlike = await like.findOneAndDelete({post:post, Like:like});

        const updatedLike =  await Post.findByIdAndUpdate(
            post,
            {$pull : {Likes:unlike._id}},
            {new :true},
        )

        res.json({
            post:updatedLike,
            success:true,
            message:"unliked a post successfully"
        })
    } catch (error) {
        res.status(400).send("Server Error")
        console.log(error)
    }
}
