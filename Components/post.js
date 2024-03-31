const Post = require("../Models/postModel2")

exports.createPost  = async (req, res) => {
    try {
        const {title, body , file} = req.body;
        const File = req.files.file;
        console.log("file aya =>", file);
        if (!File) {
            return res.status(400).json({
                success:false,
                message: "file dedoo jee"
            })
        }
        let path = __dirname + "./imgFiles/"  + Date.now();  + `.${file.name.split('.')[1]}`;

        console.log("path" ,path);
         await file.mv(path , (error)=>{
            console.log(error);
        })
        res.json({
            message: "file  uploaded successfully!",
        })

        const  post = new Post({title,body,file});

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