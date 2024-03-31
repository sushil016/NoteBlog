const express = require("express");
const router  = express.Router();

const {signup , logins} = require("../Components/usersignup")
const {createComment} = require ("../Components/comment")
const {auth, isadmin, isuser} =  require('../middlewares/userAuth');
const newUser = require("../Models/myfile");
const {likePost,unLikePost} = require("../Components/Like");
const {createPost,getAllPosts} = require("../Components/post")
const {fileUpload}= require("../Components/fileControl")

router.post('/signup',signup)
router.post('/login',auth,logins)   
router.post('/comment', auth,isuser, createComment);
router.post('/post', auth, isadmin, createPost);
router.post('/likes', auth , isuser,likePost);
router.post('/getAllPosts', auth ,isuser,  getAllPosts );
router.post('/uploadimage',auth,isuser, fileUpload);
router.post('/unlike', auth, isuser, unLikePost )

router.get('/blog', auth , (req,res)=>{
     res.json({
        success: true,
        message: 'Blog page Par apka Swagat Hai jee'
    })
} );

router.get('/admin', auth , isadmin , (req,res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome admin"
    })
} );

router.get('/user', auth, isuser ,(req,res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome User",
      });

    });

 router.get('/details', auth ,async (req,res)=>{
    try {
        const details = await req.newUser._id;
        console.log("Details", details) 
        
        const userdata = await req.newUser.findById({id : req.newUser_id})
        console.log("User Data : ", userdata)

       return res.status(201).json({
           success :true,
           data : userdata
       })
    } catch (error) {
        console.log(error)
        res.status(404).json({
          success: false,
          message: "cant get details"
        })
    }
 })   

module.exports = router;