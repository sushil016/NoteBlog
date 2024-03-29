const jwt = require('jsonwebtoken');
// const cookies = require("cookie-parser")

require("dotenv").config();

exports.auth =  ( req, res, next ) => {
    try {

       

        const token = req.header("Authorization").replace("Bearer ","");

        if (!token) {
            res.status(401).json({
                success: false,
                message: "token missing"
            })
        }
       try {
          const  decoded = jwt.verify( token, process.env.JWT_SECRET);
           console.log('decoded', decoded);
           req.newUser = decoded;


       } catch (error) {
        res.status(500).json({
            success:false,
            message: "token missing or invalid",
        })
        
       }
       next();

    } catch (error) {
        res.status(500).json({
            err: error,
            success: false,
            message: "something went wrong while fetching token"
        });
        
    }
}


exports.isadmin =  (req,res,next)=>{
   try {
    if (req.newUser.role !== "admin") {
        res.status(500).json(
            {
                success:false,
                message:"You are not admin!"
            }
        )
    }
    next();

   } catch (error) {
    res.staus(500).json({
      err: error,
      success: false,
      message: 'something went wrong'
    })
    
   }
};

exports.isuser =  (req,res,next)=> {
    try {
        if (req.newUser.role!== "user") {
            res.status(403).json({
                success:false,
                message:"user thodi na ho app"
            })
        }
        next();
    } catch (error) {
        res.staus(500).json({
            err: error,
            success: false,
            message: 'user access required'
          })
    }
}