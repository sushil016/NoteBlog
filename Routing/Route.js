const express = require("express");
const router  = express.Router();

const {signup , logins} = require("../Components/usersignup")
const {createComment} = require ("../Components/comment")
const {auth, isadmin, isuser} =  require('../middlewares/userAuth');
const newUser = require("../Models/myfile");

router.post('/signup',signup)
router.post('/login',logins)   
router.post('/comment', createComment);

router.get('/student', auth , (req,res)=>{
     res.json({
        success: true,
        message: 'welcome tostudent page a student page'
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
        // const details =req.newUser.id;
        // console.log("Details", details) 
        
        const userdata = await req.newUser.findById({id : req.newUser})
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